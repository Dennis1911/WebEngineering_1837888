//  Javascript Exercise 1..  JSON and Pulldown Window
//
// Follow the comments and code the missing part.
//
"use strict";   // this gives us some more discipline in coding correct Javascript
//
// Funtion Init defines a string. The content of that string is actually a JSON.
// This example is just for our training.
// the object. So what we do here is to define a string ' .JSON.... ' and then parse it.
function Init ()
{
// This routine should be called after the HTML has been loaded
//
// Someting like
// document.getElementsByTagName("BODY")[0].onload = Init; would make it.
// Define the JSON String
//
var jsonstring = ' { "Menschen" : [' +
  ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  },'+
  ' { "Vorname" : "Axel", "Nachname" :"Schweiß", "Gender": "male", "Rolle" : "Klassenclown"  }'+ ' ] }';

window.Menschen = JSON.parse(jsonstring);
//
// Define all click events
//

document.getElementById('PullupServices').addEventListener('click', showPullupOptions);
document.getElementById('PullupOptionsBtn').addEventListener("click",hidePullupOptions);

document.getElementById('popupli1').addEventListener('click', showpeople);
document.getElementById('hidepeoblebtn').addEventListener('click', hidepeople);

document.getElementById('searchbutton').addEventListener('click', wikisearch);
document.getElementById('searchinput').addEventListener('keydown', wikisearchkeydown);

document.getElementById('hidewikibtn').addEventListener('click', hideWiki);
}

function wikisearchkeydown(event){
  if (event.key == "Enter"){
    wikisearch()
  }

}

function wikisearch() {

  var searchInput = document.getElementById('searchinput').value;
  //test
  console.log("Suche nach:" + searchInput);
  var uri = "http://localhost:6001/proxy/?https://de.wikipedia.org/w/api.php?action=query&generator=prefixsearch&format=json&gpslimit=4&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&redirects=1&gpssearch="
            + searchInput;

  const xhttp = new XMLHttpRequest();

  var Answer;
  xhttp.onload = function() {
    //document.getElementById("demo").innerHTML = this.responseText;
    
      Answer = JSON.parse(this.responseText);
      console.log (this.responseText);
    
      showWiki(Answer);
    }

  xhttp.open("GET", uri, true);
  xhttp.send();
}


function showWiki(Answer){
  var wikitableheader = "<table id =showWikiTable>  <tr> <th>Search Argument</th><th>Description</th><th>Extract</th><th>Link</th>  </tr>"
  var wikitabletext= "";

  var pages = Answer.response.query.pages;

  for (const x in pages) {
    
    wikitabletext += "<tr>"+
                  "<td>" + pages[x].title +"</td>"+          //Search Argument
                  "<td>"+ pages[x].description +"</td>"+      //Description
                  "<td>"+ pages[x].extract +"</td>"+        //Extract
                  "<td>"+ "<a href = 'https://de.wikipedia.org/?curid='"+ pages[x].pageid +">https://de.wikipedia.org/?curid="+ pages[x].pageid +"</a></td>"+          //Link
                  "</tr>";
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = wikitableheader + wikitabletext + tableclosing;


  document.getElementById('showWikidata').innerHTML = fulltext;
  document.getElementById('showWiki').style.display = "block";
  document.getElementById('showWiki').style.top = document.getElementById('PullupOptions').offsetTop + "px" ;
}
function hideWiki(){
  console.log("Hide Wiki")
  document.getElementById('showWiki').style.display = "none";
}

function showPullupOptions()
 {
  console.log("Show Pull up window"); // just log that the event has triggered the right routine.
  //
  // access the pullup Window
  //
  var pull = document.getElementById('PullupOptions'); // variable pull refers to the HTML element with the id="abc"

  pull.style.top = document.getElementById('scrollpart').offsetTop + "px" ;
  pull.style.display = "block";
   }

function hidePullupOptions()
{
  console.log("Hide Pull up window");

  var pull = document.getElementById('PullupOptions');
  pull.style.display = "none";

  // Also hide people window if it was opened
  console.log("hide people window");
  document.getElementById('showpeople').style.display = "none";
}


  //
  // This function is a code skeleton of getting the above defined JSON and
  // to build an HTML string implementing a table with the JSON data
  //
function showpeople()  {
  //
  //  Show Menschen Object as dynamic table
  //
  console.log("show people window");
  //
  // We could use JavaScript and the HTML object methods and properties to build a table or we just
  // construct a string with the HTML data
  //
  var tableheader = "<table id =showwindowData> <tr>"; // this is the table header .. just take it
  tableheader += "<th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
  //
  // now we build each row
  //
  var tabletext = "";
  var alle = window.Menschen;
  // var alle is now the reference to the Object
  // alle.Menschen is the array of people
  for (var i = 0; i < alle.Menschen.length; i++) {
    var person = alle.Menschen[i];
    tabletext += "<tr>"+
                  "<td>" + person.Vorname +"</td>"+
                  "<td>"+ person.Nachname +"</td>"+
                  "<td>"+ person.Gender +"</td>"+
                  "<td>"+ person.Rolle +"</td>"+
                  "</tr>";
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = tableheader + tabletext + tableclosing;
  //
  // save the full text as innerHTML of the popup element named showwindowData
  document.getElementById('showwindowData').innerHTML = fulltext;
  // show the curently invisible showwindow item
  document.getElementById('showpeople').style.display = "block";
  // somewhere in the middle of the page
  document.getElementById('showpeople').style.top = document.getElementById('scrollpart').offsetTop + "px" ;
 }

function hidepeople(){

  console.log("hide people window");
  document.getElementById('showpeople').style.display = "none";
}

//
//  Done !!!!    try it out.....
//
