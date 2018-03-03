import React from 'react';

const weatherDisplay = (props) => {
    return (
        <div>
            <h1>{props.weather.temp}° {props.units}</h1>
        </div>
    )
};

export default weatherDisplay