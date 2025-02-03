import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    total: number;
    utilized: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, utilized }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const utilizationPercentage = (utilized / total) * 100;

    useEffect(() => {
        setAnimatedPercentage(utilizationPercentage);
    }, [utilizationPercentage]);

    const getProgressClass = (percentage: number): string => {
        if (percentage === 0) return 'low';
        if (percentage <= 40) return 'low';
        if (percentage <= 70) return 'medium';
        return 'high';
    };

    return (
        <div className="progress-track">
            <div 
                className={`progress-fill ${getProgressClass(utilizationPercentage)}`}
                style={{ width: utilizationPercentage === 0 ? '100%' : `${animatedPercentage}%` }}
            >
                <span className="progress-text">
                    {utilizationPercentage === 0 ? '0%' : `${utilizationPercentage.toFixed(1)}%`}
                </span>
            </div>
        </div>
    );
};
