
import axios from "axios"
import {useState} from "react"
function CurrentWeatherApp()
{
  const [city,setCity] = useState("")
  const [output,setOutput] = useState(null)
  const cityfun = (event)=>{
    setCity(event.target.value)
  }

  const showreport = ()=>{
    const apikey = "ac537bbe836e81e36aa7fffa32d483f3"
    var apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    console.log(apiurl)
    axios.get(apiurl).then(
      (res) => {
        console.log(res.data)
        setOutput(res.data)
      }
    ).catch((err)=>{
      console.log(err.response.data)
      setOutput(err.response.data)
    })
  }
  return(
    <>
    <h1>Welcome to Current Weather App</h1>
    <h4>It is a Weather report using OpenWeathermap API</h4>
    Enter your City: <input type="text" onChange={(e)=>cityfun(e)} placeholder="Enter city name" value={city}></input>
    <br></br><br></br>
    <input type="button" onClick={showreport} value="Get weather report"></input>
    <br></br><br></br>
    {output !== null && output.cod === 200 &&
    <>
      <h3>Weather Report:</h3>
      <h4>{"Main: "+output.weather[0].main}</h4>
      <h4>{"Description: "+output.weather[0].description}</h4>
      <h4>{"Wind speed: "+output.wind.speed}</h4>
    </> 
    }
    {output !== null && output.cod === "404" &&
      <h3>{"Error: "+output.message}</h3>}
    {output !== null && output.cod === "400" &&
      <h3>{"Error: "+output.message}</h3>}
    </>
  )
}
export default CurrentWeatherApp
