import React from 'react'
import classnames from 'classnames'

function ProgressBar({percent=33, trackRemaining = false, className="", color = null, big = false})
{
    let progressClassName = classnames(
        "progress",
        className,
        {
            "progress--big" : big,
            "progress--color-orangered" : color === "orangered"
        });
     
    const progressBarWidth = trackRemaining === true ? { width:(100 - percent)+"%"} : { width:percent+"%"};
    const progressBarFloat = trackRemaining === true ? { float: "right" } :  { float: "left" };

    return (
    <div className={progressClassName}>
        <div className="progress__bar" style={{...progressBarWidth,...progressBarFloat}}></div>
    </div> )
}

export default ProgressBar;