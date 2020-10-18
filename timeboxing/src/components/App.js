import React from 'react'
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox';
import RealTimeClock from './RealTimeClock';
import ErrorBoundary from './ErrorBoundary';

function App()
{ 
    return(
        <React.StrictMode>
            <div className="App">
                <ErrorBoundary message="Error in App!">
                    <RealTimeClock/>
                    <TimeboxList/>
                    <EditableTimebox/>
                </ErrorBoundary>
            </div>
        </React.StrictMode>)
} 

export default App;