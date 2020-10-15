import React from 'react'

function ProgressBar({percent=33, trackRemaining = false, className="", color = null, big = false})
{
    let progressClassName = "progress " + className;
    if(big){
        progressClassName += " progress--big"
    }
    if(color == "orangered"){
        progressClassName += " progress--color-orangered"
    }
     
    const progressBarWidth = trackRemaining === true ? { width:(100 - percent)+"%"} : { width:percent+"%"};
    const progressBarFloat = trackRemaining === true ? { float: "right" } :  { float: "left" };

    return (
    <div className={progressClassName}>
        <div className="progress__bar" style={{...progressBarWidth,...progressBarFloat}}></div>
    </div> )
}

export default ProgressBar;