import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import './home.css'

export default function Home() {

    const city = useRef();

    const[isUpdate, setIsUpdate] = useState(false);
    const[weather,setWeather] = useState({});

    const handleClick = () => {
        if(!isUpdate){
            setIsUpdate(true);
        }
        else {
            setIsUpdate(false)
        }
    }

    useEffect(() => {
        const fetchWeather = async() => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=`+city.current.value+`&appid=`)
                setWeather(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchWeather();
        
},[isUpdate])

    console.log(weather)

    return (
        <div className="home">
            <img src="assets/clouds.jpg" alt="" className="background" />
            <div className="homeWrapper">
                    <div className="head">
                        <input type="text" ref={city} className = "search" placeholder = "City"/>
                        <button onClick = {handleClick} className = "searchButton">Weather</button>
                    </div>
                        <div className="body">
                            <div className="content">
                                <span className="label">Weather: </span>
                                <span className="value">{isUpdate ? weather.weather[0].description : ""} &#9730;</span>
                            </div>
                            <div className="content">
                                <span className="label">Temp: </span>
                                <span className="value">{isUpdate ? weather.main.temp_min -273.15 : ""}&#176; C</span>
                            </div>
                            <div className="content">
                                <span className="label">Humidity: </span>
                                <span className="value">{isUpdate ? weather.main.humidity : ""} &#37;</span>
                            </div>
                            <div className="content">
                                <span className="label">Wind Speed: </span>
                                <span className="value">{ isUpdate ? weather.wind.speed : ""} m/s</span>
                            </div>
                        </div>
            </div>
        </div>
    )
}