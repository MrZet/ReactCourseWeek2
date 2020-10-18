import React from 'react'
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox';
import RealTimeClock from './RealTimeClock';
import Error from './Error';

function App()
{ 
    return(
        <React.StrictMode>
            <div className="App">
                <Error message="Error in App!">
                    <RealTimeClock/>
                    <TimeboxList/>
                    <EditableTimebox/>
                </Error>
            </div>
        </React.StrictMode>)
} 

export default App;