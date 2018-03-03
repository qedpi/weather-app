import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios';

import WeatherDisplay from './WeatherDisplay';

import './App.css';

import openweatherKey from './config';


class App extends Component {
    state = {
        message: 'hello',
        location: {
            longitude: null,
            latitude: null,
        },
        openweatherUrl: `https://api.openweathermap.org/data/2.5/weather?`,
        openweatherKey: '&APPID=' + openweatherKey,
        unitsFormat: 'metric',  // or 'imperial'
        weather: null,
    };

    getLocationHandler = () => {
        console.log('getting location');
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const locationArg = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
                const unitsArg = `&units=${this.state.unitsFormat}`;
                const queryString = this.state.openweatherUrl + locationArg + unitsArg + this.state.openweatherKey;
                axios.get(queryString)
                    .then(response => {
                        const main = response.data.main;
                        this.setState({
                            weather: {
                                temp: main.temp,
                                tempMin: main.temp_min,
                                tempMax: main.temp_max,
                                humidity: main.humidity,
                                windSpeed: response.data.wind.speed,
                                cloudCover: response.data.clouds.all,
                            }
                        }, () => console.log(this.state))
                    })
            }, error => console.log('unable to retrieve location'));
        } else {
            console.log('Geolocation is not supported by your browser');
        }
    };

    toggleUnitsHandler = () => {
        this.setState({
            unitsFormat: this.state.unitsFormat === 'metric'? 'imperial' : 'metric'
        });
    };

    render() {
        const foundWeather = this.state.weather ?
            <WeatherDisplay weather={this.state.weather}
                            units={this.state.unitsFormat === 'metric' ? 'C' : 'F'}>
            </WeatherDisplay> : null;

        return (
            <div className="App">
                <div className="container">
                    <h1>Weather App (React)</h1>
                    <button onClick={this.toggleUnitsHandler} className="btn btn-primary">C / F</button>
                    <p>
                        <span>
                            <button className="btn btn-primary" onClick={this.getLocationHandler}>
                                <i className="fas fa-location-arrow"/>
                            </button>
                        </span>
                        {this.state.location.longitude}, {this.state.location.latitude}</p>
                    {foundWeather}
                </div>
            </div>
        );
    }
}

export default App;
