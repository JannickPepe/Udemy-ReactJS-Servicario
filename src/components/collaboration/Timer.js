import React, { useEffect, useState } from 'react';
import moment from  'moment';


//create functionally component with values into it as seconds and timeOutCallback. We make a varible array contain secondsLeft and setSecondsLeft 
//and pass it into useState method and on to seconds
const Timer = ({seconds, timeOutCallback}) => {

    const [secondsLeft, setSecondsLeft] = useState(seconds)

    //useEffect method return the timeOutCallback if there is no secondsLeft. Makes a functional component to set second timer as -1 in nanoseconds format
    useEffect(() => {
        
        if (!secondsLeft) { return timeOutCallback()}

        const intervalId = setInterval(() => {
            setSecondsLeft(secondsLeft -1)
        }, 1000)

    return () => clearInterval(intervalId)
    }, [secondsLeft,  timeOutCallback])

    return (
        <div className="timer">
        {/*will show the countdown with secondsLeft and moment of created (* 1000 for nanoseconds)*/}
        {secondsLeft && moment.utc(secondsLeft * 1000).format('HH:mm:ss')}
        </div>
    )
}

export default Timer;