import React from 'react'
import TimeboxList from './TimeboxList'
import EditableTimebox from './EditableTimebox'
import RealTimeClock from './RealTimeClock';

function App()
{ 
    return(
        <React.StrictMode>
            <div className="App">
                <RealTimeClock/>
                <TimeboxList/>
                <EditableTimebox/>
            </div>
        </React.StrictMode>)
} 

export default App;