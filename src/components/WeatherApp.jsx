import React, {useState} from 'react';
import './WeatherApp.css';
import {assets} from '../assets/assets';


const WeatherApp = () =>{
    let api_key = "d81f7a5d9169044d3b6218e34fa7a33a";
    const [wicon, setWicon] = useState(assets.clear_icon);

    const search = async() =>{
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
            return 0;
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let response = await fetch(url);
        let data = await response.json(); //Parse the response data into json and store it at data
        console.log(data);

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°c"; 
        location[0].innerHTML = data.name;
        
        //Setting weather images
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(assets.clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(assets.cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(assets.drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(assets.drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(assets.rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(assets.rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(assets.snow_icon);
        }
        else{
            setWicon(assets.clear_icon);
        }

        element[0].value = "";
    }



    return(
        <div className='container'>
            {/* 1)TOP BAR */}
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Search'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img src={assets.search_icon} alt=""/> 
                </div>
            </div>
            
            {/* 2)WEATHER IMAGE, TEMP, LOCATION */}
            <div className='weather-image'>
                <img src={wicon} alt="" /> 
            </div>
            <div className='weather-temp'>33°c</div>
            <div className='weather-location'>Kolkata</div>

            {/* 3)DATA CONTAINER */}
            <div className='data-container'>
                <div className='element'>
                    <img src={assets.humidity_icon} alt="" className='icon' /> 
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={assets.wind_icon} alt="" className='icon'/> 
                    <div className='data'>
                        <div className='wind-rate'>11km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherApp;



/* API CALLS LINK
https://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&appid=d81f7a5d9169044d3b6218e34fa7a33a
*/