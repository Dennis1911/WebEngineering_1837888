<template>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Focus</title>
</head>
<body>
  <div id="app"> 
    <div class="menübar">
      <!-- Darkmode button -->
      <button  v-on:click="Funktion()" class="dbtn"><img src="./assets/Moon.png"></button> 
      <a class="websiteName" style="float: left; font-size: 34px; font-weight: 800;" >FOCUS</a>
      <a>WEATHER</a>
      <a>SPOTIFY</a>
      <a class="active" >TIMER</a>      
    </div>
    <main>
      <!-- searchbar -->
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          v-on:keypress="getWeather"
        />
      </div>
      <div  id="showForecast">
        <div class="showForecast" id="showForecastData"></div>
      </div>
      <!-- Location of the Weather -->
      <!-- The Weather Information will only be shown, if a search has been done -->
      <!-- <div class="weatherFeature" v-if="(typeof weather.list != 'undefined')"> 
        <div class="weatherLocation-box"> -->
          <!-- <div class="location">{{weather.}}, {{weather.sys.country}}</div> -->
          <!-- <div class="date">{{getDate()}}</div>
        </div> -->
        <!-- Forecast data -->
        <!-- <div class="wheatherForecast-box">
          <div class="temp">{{temps[0]}}</div>
          <div class="wheater">{{dates[0]}}</div> -->
        <!-- </div> -->
    <!-- </div> -->
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
      api_key: 'c3c119d9c762e62a38a494704228fc32',
      query: '',
      url_weatherForecast: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      temps: [],
      dates: []
      
    }
  },
  methods: {   
  // Function for the dark mode
  Funktion() {
   var element = document.body;
   element.classList.toggle("dark-mode");
    },
    // get weather from openweathermap.org
  getWeather (e) {
      if (e.key == "Enter") {
        fetch(`${this.url_weatherForecast}forecast?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    setTemps(response){
      var tableheader = "<table> <tr>";
      tableheader += "<th>Time</th><th>Temperatur</th><th>Icon</th></tr>";
      let tabletext = "";
      let len = Object.values(response.list).length;
      console.log(len);
      for(var i=0; i < len; i++){
        let obj = Object.values(response.list)[i];
        tabletext += "<tr><td>" + obj.dt_txt + "</td>" + "<td>" + obj.main.temp + "</td><td>" + "<img src=\"http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png\">" + "</td></tr>";
        let temp = Object.values(response.list)[i].main.temp;
        let time = Object.values(response.list)[i].dt_txt;
        this.temps.push(temp);
        this.dates.push(time);
  }
    let tableclosing = "</table>";
    let fulltext = tableheader + tabletext + tableclosing;
    document.getElementById('showForecast').innerHTML = fulltext;
    console.log(this.temps)
    console.log(this.dates)
    },
    setResults(results){
      this.weather = results;
      this.setTemps(results);
      this.getData(results);
    },
    getDate(){
      let d = new Date();
      let dt = d.toLocaleDateString()
      return `${dt}`;
    }
  //   getData(data){
  //   this.items = data;
  //     for(var i = 0; i < this.items.list.length; i++){
  //       this.dates = this.items.list[i].dt_txt.substring(10);
  //       this.temps = this.items.list[i].main;
  //       //if 12 o'clock middat is found
  //       // arraycontainsMidday = (this.dates.indexOf("12:00:00") > -1);
  //     }

  //     for(var j = 0; j < this.items.list.length; j++){
  //       this.temps = this.items.list[j].main.temp;
  //       if (this.dates.indexOf("12:00:00")) {
  //         console.log(this.temps);  
  //       }
        
  //     }
    
  // }
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

/*container*/
.menübar{ 
	overflow: hidden;
	background-color: #282828;
}

.menübar a{
  display: flex;
  justify-content: space-around;
  text-decoration: none;
	float: right;
	color: #ffffff;
	align-items: center;
  min-height: 40px;
	padding: 35px 20px;
	font-size: 20px;
  letter-spacing: 2px;
}


.menübar a:hover {
	background-color: #4d4b4b;
}

.menübar a.active {
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

  
  .dark-mode {
    background-color: white;
    color: black;
  }

  .dbtn{
    margin-top: 2%;
    background: #282828;
    border: none;
    padding: 10px;
    float: right;
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

  .weatherLocation-box .location {
    color: #ffffff;
    font-size: 28;
    font-weight: 400;
    text-align: center;
    padding-top: 4%;
  }

  .weatherLocation-box .date {
    color: #ffffff;
    font-size: 8;
    font-weight: 200;
    text-align: center;
  }

  .wheatherForecast-box {
    text-align: center;
  }

  .wheatherForecast-box .temp{
    padding: 10px 25px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;
  }

  .wheatherForecast-box .weather {
    padding: 10px 25px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;
  }
  
  .search-box .search-bar{
    align-items: center;
    padding: 15px;
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
/* Nächste Schritte: 
- Wetter App + Einfach 5 icons anzeigen. Egal wie, egal wo
- Nur noch Icons und die richtige Anfrage, bzw. die richtigen Daten auswerten
- Spotify Aufgabe
-
 */
</style>

