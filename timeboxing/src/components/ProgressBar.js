import React from 'react'

function ProgressBar({percent=33, trackRemaining = false, className=""})
{
    const progressBarWidth = trackRemaining === true ? { width:(100 - percent)+"%"} : { width:percent+"%"};
    const progressBarFloat = trackRemaining === true ? { float: "right" } :  { float: "left" };

    return (
    <div className={"ProgressBar "+className}>
        <div style={{...progressBarWidth,...progressBarFloat}} className="ActualProgress"></div>
    </div> )
}

export default ProgressBar;