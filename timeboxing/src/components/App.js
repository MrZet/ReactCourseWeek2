import React from 'react'
import TimeboxList from './TimeboxList'
import EditableTimebox from './EditableTimebox'
import RealTimeClock from './RealTimeClock';

function App()
{ 
    return(
    <div className="App">
        <RealTimeClock/>
        <TimeboxList/>
        <EditableTimebox/>
    </div>)
} 

export default App;