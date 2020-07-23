import './App.css';
import React, { Component } from 'react'



const apikey = process.env.REACT_APP_APIKEY


export default class App extends Component {
  constructor(props) {

    console.log("cons")
    super(props)
    this.state = {

      locationName: null,
      temp: null,
      description: null   }
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getLocation()

  }

  showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude : " + latitude + " Longitude: " + longitude);
 }

  getLocation() {
    if(navigator.geolocation) {
       
       // timeout at 60000 milliseconds (60 seconds)
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
    } else {
       alert("Sorry, browser does not support geolocation!");
    }
 }

 async getWeather(latitude, longitude) {
  //console.log(apikey)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9d63ebfa244bc956de539a7a69fa9cb3&units=metric`;
  //console.log("url",url)
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  this.setState({
    locationName: data.name,
    temp: data.main.temp,
    description: data.weather[0].description
  });
};

getLocation  = () => {
  navigator.geolocation.getCurrentPosition((post) => {
    this.getWeather(post.coords.latitude, post.coords.longitude)
  })
}

  callCountry = async (name) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9d63ebfa244bc956de539a7a69fa9cb3&units=metric`
    let data = await fetch(url)
    let result = await data.json()
    console.log("result", result)
    this.setState({
      locationName: result.name,
      temp: result.main.temp,
      description: result.weather[0].description
    });
  }


  render() {
    if (this.state.temp === null) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      
      <div >
        <div className="buttoncontainer">
        <button className="btn" onClick={() => this.callCountry('saigon')}>Your Location</button>
        <button className="btn" onClick={() => this.callCountry('tokyo')}>Tokyo</button>
        <button className="btn" onClick={() => this.callCountry('berlin')}>Berlin</button>
        <button className="btn" onClick={() => this.callCountry('moscow')}>Moscow</button>
        <button className="btn" onClick={() => this.callCountry('nairobi')}>Nairobi</button>
        <button className="btn" onClick={() => this.callCountry('denver')}>Denver</button>
        <button className="btn" onClick={() => this.callCountry('helsinki')}>Helsinki</button>
        <button className="btn" onClick={() => this.callCountry('rio')}>Rio</button>
        <button className="btn" onClick={() => this.callCountry('palermo')}>Palermo</button>
        </div>

        <div className="biggercontainer">
        <div className="maincontainer">
        <h1 className="location">{this.state.locationName}</h1>
        <h1>{this.state.temp}°C</h1>
        <h1>~/{this.state.description}/~</h1>
        </div>
        </div>
      </div>
    )
  }
}
