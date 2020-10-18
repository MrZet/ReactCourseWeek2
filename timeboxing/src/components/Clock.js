import React from 'react'
import PropTypes from 'prop-types'

const addLeadingZeroes = (number, places = 2) => number.toString().padStart(places,'0');
        
function validateDatePart(datePart, maxValue)
{
    if(datePart<0)
        return 0;
    else if(datePart>maxValue)
        return maxValue;
    else 
        return datePart;
}

function formatDate(datePart, maxValue, places)
{
    datePart = datePart.toString();
    datePart = validateDatePart(datePart, maxValue);
    datePart = addLeadingZeroes(datePart, places)

    return datePart;
}

function Clock({hours, minutes, seconds, miliseconds, className, children})
{
    hours = formatDate(hours,23);
    minutes = formatDate(minutes,59);
    seconds = formatDate(seconds,59);
    miliseconds = formatDate(miliseconds,999,3);

    return (<h2 className = {"Clock "+className}>{children} {hours}:{minutes}:{seconds}:{miliseconds}</h2>);
};

Clock.defaultProps = {
    hours:0, 
    minutes:0, 
    seconds:0, 
    miliseconds:0, 
    className:"" 
}

Clock.propTypes = {
    hours:PropTypes.number.isRequired, 
    minutes:PropTypes.number.isRequired, 
    seconds:PropTypes.number.isRequired, 
    miliseconds:PropTypes.number, 
    className:PropTypes.string
}

export default Clock;