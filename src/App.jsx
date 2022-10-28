
import axios from 'axios'
import { useState, useEffect} from 'react'
import './App.css'



function App() {
  
  const[weather, setWeather] = useState({})
  const[isCelsius, setIsCelsius ] = useState(true)

  useEffect(() =>{

    const success = pos =>{
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude; 

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d874d712eea2872d78de63de1983db63`)
      .then((res) => setWeather(res.data))
    }
    

    navigator.geolocation.getCurrentPosition(success);
  },[])

  console.log(weather);
  document.body.style = `background: #0081CF`

  return (
    <div className='App'>
    
      <div className="container">
        
        <div className='title'>
            <h2>Wearher App</h2>
            <p>{`${weather.name} ${weather.sys?.country}`}</p>
        </div>
        <div className='containerMid'>
            <div className='imgGrados'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                <h3>
                  {`${isCelsius ? Math.round(weather.main?.temp - 273.15) : Math.round(weather.main?.temp - 459.67)} 
                  ${isCelsius ? "°C" : "°F"}`}
                </h3> 
            </div>
                <div className='characteristic'>
                    <p className='pOne'>
                      "{weather.weather?.[0].description}"
                    </p>
                    <p>
                      <i className='textBlue'>
                        <i class="fa-solid fa-wind"></i> 
                        {" "} Wind speed:
                      </i>
                      {" "} {weather.wind?.speed} <b>m/s</b>
                    </p>
                    <p>
                      <i className='textBlue'>
                        <i class="fa-solid fa-cloud"></i>
                        {" "}Clouds:
                      </i>
                      {"  "}{weather.clouds?.all} <b>%</b>
                    </p>  
                    <p>
                      <i className='textBlue'>
                        <i class="fa-solid fa-temperature-three-quarters"></i>
                        {" "}Pressure:
                      </i>
                      {" "} {weather.main?.pressure * 0.000987} <b>atm</b>
                    </p>
                </div>

        </div>
        <div className='button'>
            <button onClick={()=> setIsCelsius(!isCelsius)}>
              <b>degrees °C/°F</b>
            </button>
        </div>
        
        </div>
    </div>
      )
}

export default App
