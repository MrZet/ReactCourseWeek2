import React,{useEffect, useContext, useReducer} from 'react'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { Timeboxes } from './Timeboxes'
import ErrorBoundary from './ErrorBoundary';
import Timebox from './Timebox'
// import TimeboxReadOnly from './TimeboxReadOnly'
import TimeboxEditor from './TimeboxEditor'

const useLegacySetState = (initialState) => {
    const reducer = (prevState, changedState) => {
        let newState = prevState;
        if(typeof changedState === "function"){
            newState = changedState(prevState);
        } else {
            newState = {...prevState, ...changedState};
        }
        return newState;
    };

    return useReducer(reducer, initialState);
}



function TimeboxesManager()
{
    const initialState = {
        timeboxes:[],
        hasError:false,
        isLoading:true,
        isError:false,
        editIndex: null
    }

    const [state, setState] = useLegacySetState(initialState);

    const {accessToken} = useContext(AuthenticationContext);

    useEffect(() => {
            TimeboxesAPI.getAllTimeboxes(accessToken)
                .then((resolve) => setState({timeboxes:resolve}))
                .catch(() => setState({isError:true}))
                .finally(() => setState({isLoading:false}));
        }, []
    );

    const addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, accessToken)
            .then((addedTimebox)=>{
                setState(prevState=>{
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return {timeboxes};
            })
        })
    }

    const handleCreate = (createdTimebox) =>
    {
        addTimebox(createdTimebox, accessToken)
    }

    const handleDelete = (indexToDelete) =>
    {
        TimeboxesAPI.removeTimebox(state.timeboxes[indexToDelete], accessToken)
        .then(()=>
            setState(prevState=>{
                const timeboxes = prevState.timeboxes.filter((timebox,index) => index !== indexToDelete);
                return {timeboxes};
            })
        )
    }

    const handleEdit = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
            .then(
                (updatedTimebox) => setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) =>
                        index === indexToUpdate ? updatedTimebox : timebox
                    )
                    return { timeboxes };
                })
            )
        
    }

    const handleError = (indexOfError) =>
    {
        setState(prevState=>{
            const timeboxes = prevState.timeboxes.map((timebox,index)=>
                ({...timebox,
                    hasError: (index === indexOfError ? true : timebox.hasError)
                    })
            )
            return {timeboxes};
        })
    }

    const handleCancel = () => console.log('Cancelled');

    const renderTimebox = (timebox,index) => {
        return (
                <ErrorBoundary key={timebox.id} message="Something gone bad :(">                   
                    {state.editIndex === index ?
                    <TimeboxEditor
                        initialTitle = {timebox.title}
                        initialTotalTimeInMinutes = {timebox.totalTimeInMinutes}
                        onCancel = {() => setState({editIndex:null})}
                        onUpdate = {(updatedTimebox) => {
                            handleEdit(index,{...timebox,...updatedTimebox});
                            setState({editIndex : null});
                        }}
                    />
                    :  <Timebox
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() =>handleDelete(index)}
                    onEdit={() => {
                            state.editIndex === null || state.editIndex !== index
                            ? setState({editIndex:index})
                            : setState({editIndex : null});
                        }}
                    hasError={() => handleError(index)} 
                />}
                </ErrorBoundary>
        )
    }

    return (
        <>
            <TimeboxCreator onCreate = {handleCreate}/>
            {state.isLoading? "Components are loading..." : null}
            {state.isError? "Something gone bad :(" : null}
            <Timeboxes                 
                timeboxes = {state.timeboxes}
                renderTimebox = {renderTimebox}
            />
        </>
    )
}

export default TimeboxesManager;