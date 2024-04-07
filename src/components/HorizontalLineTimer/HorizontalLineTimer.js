import React, { useState, useEffect } from 'react';
import './HorizontalLineTimer.css';

const HorizontalLineTimer = ({ totalSeconds, whenOver, isGameOver }) => {
    const [widthPercentage, setWidthPercentage] = useState(100);

    var remainingSeconds = totalSeconds
    useEffect(() => {
        const timer = setInterval(() => {
            if(remainingSeconds <= 0) {
                setWidthPercentage(0)
                if(!isGameOver) {
                    remainingSeconds = totalSeconds
                    whenOver()
                } else {
                    clearInterval(timer)
                }
            }
            setWidthPercentage(() => {
                // Calculate the new width percentage based on remaining time
                remainingSeconds -= 1;
                const fractionLeft = (remainingSeconds * 100.0) / totalSeconds;
                return fractionLeft;
            });
        }, 1000); // Update the width every second

        // Clean up interval
        return () => clearInterval(timer);
        
    }, [totalSeconds]); // Run effect whenever totalSeconds changes

    return (
        <div className="timer-wrapper">
            <div className="timer-data" style={{ width: `${widthPercentage}%` }}></div>
        </div>
    );
};

export default HorizontalLineTimer;
