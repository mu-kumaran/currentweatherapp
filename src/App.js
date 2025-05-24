
import axios from "axios"
import {useState} from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function CurrentWeatherApp()
{
  const [city,setCity] = useState("")
  const [output,setOutput] = useState(null)
  const cityfun = (event)=>{
    setCity(event.target.value)
  }

  const showreport = ()=>{

    const apikey = `${process.env.REACT_APP_WEATHER_API_KEY}`
    var apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    axios.get(apiurl).then(
      (res) => {
        // console.log(res.data)
        setOutput(res.data)
      }
    ).catch((err)=>{
      // console.log(err.response.data)
      setOutput(err.response.data)
    })
  }
  return(
    
    <div className="align-items-center justify-content-center text-center min-vh-100 mt-5">
    <title>Current Weather App</title>
    <h1><span className="text-primary">Welcome to Current Weather App</span></h1>
    <p><b>This app gives the current weather data of your cities</b></p>
    <label><b>Enter your city :</b></label>&nbsp;
    <input type="text" onChange={(e)=>cityfun(e)} placeholder="Enter city name" value={city}></input>
    <br></br><br></br>
    <button onClick={showreport} className="btn btn-success">Get weather report</button>
    <br></br><br></br>

    {output !== null && output.cod === 200 && output.wind.gust !==undefined &&
    <>
      <h3><u>Weather Now</u></h3>
      <h4>{"Status: "+output.weather[0].main}</h4>
      <h4>{"Description: "+output.weather[0].description}</h4>
      <h4>{"Wind speed: "+output.wind.speed+" m/sec"}</h4>
      <h4>{"Wind direction: "+output.wind.deg+" degrees"}</h4>
      <h4>{"Wind gust: "+output.wind.gust+" m/sec"}</h4>
      <h4>{"Temperature: "+`${(output.main.temp - 273.15).toFixed(1)}`} &deg;C</h4>
      <h4>{"Pressure: "+output.main.pressure+" hPa"}</h4>
      <h4>{"Humidity: "+output.main.humidity+" %"}</h4>
    </>
    }

    {output !== null && output.cod === 200 && output.wind.gust === undefined &&
    <div >
      <h3><u>Weather Report:</u></h3>
      <h4>{"Status: "+output.weather[0].main}</h4>
      <h4>{"Description: "+output.weather[0].description}</h4>
      <h4>{"Wind speed: "+output.wind.speed+" m/sec"}</h4>
      <h4>{"Wind direction: "+output.wind.deg+" degrees"}</h4>
      <h4>{"Temperature: "+`${(output.main.temp - 273.15).toFixed(1)}`} &deg;C</h4>
      <h4>{"Pressure: "+output.main.pressure+" hPa"}</h4>
      <h4>{"Humidity: "+output.main.humidity+" %"}</h4>
    </div> 
    }
    {output !== null && output.cod === "404" &&
      <h3>{"Error: "+output.message}</h3>}
    {output !== null && output.cod === "400" &&
      <h3>{"Error: "+output.message}</h3>}
    </div>
  )
}
export default CurrentWeatherApp
