<template>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Focus</title>
</head>
<body class="pagegridcontainer">
  <div id="app">
    <div class="pagegridnavigation">
    <div class="flexboxnav" id="flexboxnavDarkMode">
      <!-- Darkmode button --> 
      <a class="websiteName" style="margin-right:auto; justify-content: flex-start; float: left; font-size: 34px; font-weight: 800;" >FOCUS</a>
      <a v-on:click="activateForecast()" id="weatherNav" >WEATHER</a>
      <a v-on:click="activateSpotify()" id="spotifyNav">SPOTIFY</a>
      <a v-on:click="activateTimer()" id="timerNav" >TIMER</a>
    </div>
  </div>
    <main class="pagegridcontent">

      <div id="weatherForecastBox" class="weatherForecastBox">
      <!-- searchbar -->
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          v-on:keypress="getWeather"
        />
        <!-- Forecast table -->
      </div>
      <div  id="showForecast">
        <div class="showForecast" id="showForecastData"></div>
      </div>
    </div>

    <!-- Spotify Api -->

    <div id="spotifyBox" class="flexspotify">
      <iframe class="showSpotify" style="border-radius:12px" 
       src="https://open.spotify.com/embed/playlist/6gOj4tqJqJ6Y9JLdKUMbrI?utm_source=generator&theme=0"
       width="60%" height="380" frameBorder="0" allowfullscreen="" justify-content="center" align-items="center"
       allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
      </iframe>
    </div>

    </main>
  </div>
</body>

</template>

<!--  -->

<script>
export default{
  name: "app",
  data (){
    return {
      weatherforecastapi_key: 'c3c119d9c762e62a38a494704228fc32',
      query: '',
      url_weatherForecast: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      // Spotify:
      spotify_user_id: "guntd", // client_id:"51b2f1e4f8d5454b9a7067cd85325d77", // client secret: "331967fc072f4028a79a815ea57a0b68",
      refresh_token:"",
      base_64: "NjYwYzQwNzk1ZjAwNDM2MjkyMGE2NmZhMzZlMTg3MmU6MzZkMzgyZTVhMGVhNGJkNGFkYTViNmVlZjg0MzViMWE="

    }
  },
  methods: { 
  activateForecast() {
    document.getElementById('spotifyBox').style.display = "none";
    document.getElementById('weatherForecastBox').style.display = "block";
    document.getElementById('weatherNav').style.backgroundColor = "#4d4b4b"
    document.getElementById('spotifyNav').style.backgroundColor = "#282828"
  },
    // get weather from openweathermap.org
  getWeather (e) {
      if (e.key == "Enter") {
        fetch(`${this.url_weatherForecast}forecast?q=${this.query}&units=metric&APPID=${this.weatherforecastapi_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    // 
    setWeatherData(response){
      var tableheader = "<table> <tr>";
      tableheader += "<th>Time</th><th>Temperatur</th><th>Icon</th></tr>";
      let tabletext = "";
      let len = Object.values(response.list).length;
      console.log(len);
      for(var i=0; i < len; i++){
        let obj = Object.values(response.list)[i];
        tabletext += "<tr><td>" + obj.dt_txt + "</td>" + "<td>" + obj.main.temp + "°C" + "</td><td>" + "<img src=\"http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png\">" + "</td></tr>";
  }
    let tableclosing = "</table>";
    let fulltext = tableheader + tabletext + tableclosing;
    document.getElementById('showForecast').innerHTML = fulltext;
    },
    setResults(results){
      this.weather = results;
      this.setWeatherData(results);
    },
    getDate(){
      let d = new Date();
      let dt = d.toLocaleDateString()
      return `${dt}`;
    },
    // Spotify Js
    activateSpotify() {
      console.log("in Aktivate");
      document.getElementById('spotifyBox').style.display = "block";
      document.getElementById('spotifyNav').style.backgroundColor = "#4d4b4b"
      document.getElementById('weatherForecastBox').style.display = "none";
      document.getElementById('weatherNav').style.backgroundColor = "#282828"
      console.log("Hide WeatherForecast");
  }
  }
  
  
}
  
</script>

<!--  -->

<style>
body {
  margin: 0;
  padding: 0;
	font-family: 'Open Sans Condensed', sans-serif;
  box-sizing: border-box;
}

/* Responsive Design */

.pagegridcontainer {display:grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    justify-items: stretch;
    align-items: stretch;
    row-gap: 20px;
  }

  .pagegridnavigation {grid-area: 2 / 1/ span 1 / span 1}
  .pagegridcontent  {grid-area: 3 / 1 / span 1 / span 1}

  .flexboxnav, .flexboxcontent {display: flex; flex-flow: row wrap;}
  .flexboxnav,.flexboxcontent {justify-content: space-between; align-items: center;}
  .weatherForecastBox {justify-content: space-between; align-items: stretch;}
  .flexboxnav {justify-content: flex-end;}
  .flexspotify {justify-content: center; margin: auto; flex-flow: column;}

/*container*/
.flexboxnav{ 
	overflow: hidden;
	background-color: #282828;
}

.flexboxnav a{
  display: flex;
  justify-content: space-around;
  text-align: center;
	float: right;
	color: #ffffff;
	align-items: center;
  min-height: 40px;
	padding: 40px 20px;
	font-size: 20px;
  letter-spacing: 3px;
}


.flexboxnav a:hover {
	background-color: #4d4b4b;
}

.flexboxnav a.active {
  background-color: #4d4b4b;
  color: rgb(255, 255, 255);
}

.websiteName {
  background-image: url('./assets/fontgif.gif');
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

  /*Dark mode, Button und Funktion (Javascript)*/
  body {
    background-color: #1d1c1c;
    color: rgb(226, 219, 219);
  }

  /*Hintergrundbild*/
  #app {
    background-image: url("./assets/bpic.jpg");
    min-height:900px;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }

  main{
    min-height: 100vh;
    padding: 30px;
    /* Nice gradient effect to the bottom :) */
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.05),rgba(0,0,0,0.65));
  }

  .search-box .search-bar{
    align-items: center;
    padding: 15px;
  }

/* Forecast CSS */
  .weatherForecastBox {
    display: none;
  }

  .showForecast {
    right: 50%
  }

  tr {
    padding: 5px;
  }

  td {
        width: 150px;
        text-align: center;
        padding: 5px;
      }

  table {
    border-collapse: separate;
    border-spacing: 0 15px;
  }

/* Spotify Css */

.flexspotify {
    display: none;
  }

  .showSpotify {
    margin-left: auto;
    margin-right: auto;
  }

  @media only screen and (min-width: 10px) {
  .flexboxnav a{width:100%;}
  .flexspotify {width:100%}
  .weatherForecastBox {width:30%}
  }
  /* For small  tablets: 450-700  */
  @media only screen and (min-width: 610px) {
    .flexboxnav a{width:100%;}
    .flexspotify {width:100%}
    .weatherForecastBox {width:60%}
  }
  @media only screen and (min-width: 1000px) {
    .flexboxnav a {width:10%;}
    .flexspotify {width:100%}
    .weatherForecastBox {width:100%}
}
</style>

