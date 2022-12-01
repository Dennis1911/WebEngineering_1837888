<template>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Focus</title>
</head>
<body>
  <div id="app">      
    <div class="container">
     <div class="menübar">
      <button  v-on:click="Funktion()" class="dbtn"><img src="./assets/Moon.png">
        </button> 
      <a style="float: left; font-size: 35px;" >FOCUS</a>
      <a>WEATHER</a>
      <a>SPOTIFY</a>
      <a class="active" >TIMER</a>      
    <!--Darkmode button-->
        </div>
    </div>
  </div>
  <!--Hintergrund Bild-->
  <div class="bpic">
  </div>
</body>
</template>

<!--  -->

<script>
export default{
  name: "app",
  data (){
    return {
      api_key: 'c3c119d9c762e62a38a494704228fc32'
    }
  },
  methods: {   
  Funktion() {
   var element = document.body;
   element.classList.toggle("dark-mode");
   
    },
  
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
  .bpic{
    
    background-image: url("./assets/bpic.jpg");
    min-height:900px;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }

</style>
