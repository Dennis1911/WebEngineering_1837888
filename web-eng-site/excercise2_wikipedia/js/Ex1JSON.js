"use strict";   // this gives us some more discipline in coding correct Javascript

function Init ()
{
console.log("Hallo");

var jsonstring = ' { "Menschen" : [' +
  ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  },'+
  ' { "Vorname" : "Johnny", "Nachname" :"Sünden", "Gender": "male", "Rolle" : "Artist"  }'+
  ' ] }';

  window.Menschen = JSON.parse(jsonstring);

  document.getElementById('PullupServices').addEventListener("click", showPopup);

  document.getElementById('backBttn').addEventListener("click", back);
  document.getElementById('backBttn2').addEventListener("click", back); // wieso muss man hier eine andere ID für den anderen Zurück Bttn geben?

  document.getElementById('MenschenListe').addEventListener("click", showMenschen);
}
function showPopup()
 {
  console.log("Pull up"); // just log that the event has triggered the right routine.
 
  var pull = document.getElementById('PullupOptions'); // variable pull refers to the HTML element with the id="abc"
 
  pull.style.top = document.getElementById('scrollpart').offsetTop + "px";
  pull.style.display = "block";
   }

   function back()
 {
  console.log("Pull down"); // just log that the event has triggered the right routine.
 
  var pull = document.getElementById('PullupOptions'); // variable pull refers to the HTML element with the id="abc"
  document.getElementById('showwindow').style.display = "none"; // verstecke Menschenwindow
 
  pull.style.top = document.getElementById('scrollpart').offsetTop + "px";
  pull.style.display = "none";
   }
 
   function showMenschen()  {
  console.log("showMenschen ");
 
  var tableheader = "<table> <tr>"; // this is the table header .. just take it
  tableheader += "<th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
 
  var tabletext = "";
  var alle = window.Menschen;
 
  for (var i = 0; i < alle.Menschen.length; i++) {
    var person = alle.Menschen[i];
    tabletext += "<tr><td>" + person.Vorname + "</td>";
    tabletext += "<td>" + person.Nachname + "</td>";
    tabletext += "<td>" + person.Gender + "</td>";
    tabletext += "<td>" + person.Rolle + "</td></tr>";
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = tableheader + tabletext + tableclosing;
 
  document.getElementById('showwindowData').innerHTML = fulltext;
  document.getElementById('showwindow').style.display = "block";
  document.getElementById('showwindow').style.top = "50%";
 }
 document.getElementsByTagName("BODY")[0].onload = Init;

// Ab hier ist Wiki API ->

 function runWikiQuery(){
  var query = "http://localhost:6001/proxy/?url=https://de.wikipedia.org/w/api.php"
  query = query + "?action=query&generator=prefixsearch&format=json&gpslimit=4"
                + "&prop=extracts%7Cdescription"
                + "&exintro=1&explaintext=1&exsentences=3&gpssearch="
                + document.getElementById('wikisearchstring').value;
  var xhttp = new XMLHttpRequest();
  console.log("Wiki Search String ",query);
  xhttp.onreadystatechange = function() {
    console.log("callback reached ",this.readyState);
    if (this.readyState == 4 && this.status == 200) {
      try {
        var response = JSON.parse(this.responseText);
        console.log(response);
      } catch (e) {
        document.getElementById('showwindowData').innerHTML = e;
        document.getElementById('showwindow').style.display = "block";
        return;
      }
      if (response.error != null && response.error.message != undefined)
      {
          document.getElementById('showwindowData').innerHTML = "AN ERROR OCURRED " + response.error.message;
          document.getElementById('showwindow').style.display = "block";
      }
      else {
        console.log("Data ", response.response.query.seiten);
        var text = "<table id='wikiresulttable' style='background-color:gray;'><tr><th>Search Argument</th><th>Description</th><th>Extract</th><th>Link</th><tr>";
        var seiten = response.response.query.seiten;
        for (var seite in seiten) {
          if (seiten.hasOwnProperty(seite)) {
             (seiten[seite].description ==  undefined) ? " - " : seiten[seite].description;
            text += "<td>" + seiten[seite].title + "</td>";
            text += (seiten[seite].description ==  undefined) ? "<td> - </td>": "<td>" + seiten[seite].description + "</td>";
            text += (seiten[seite].extract == undefined) ? "<td> - </td>":"<td>" + seiten[seite].extract + "</td>";
            text += "<td><a href=" + "'https://de.wikipedia.org/?curid=" + seiten[seite].pageid + "' target='_blank'>" +
                    "https://de.wikipedia.org/?curid=" + seiten[seite].pageid+ "</a></td></tr>"
          }
        }
        text += "</table>";
        document.getElementById('showwindowData').innerHTML = text;
        document.getElementById('showwindow').style.display = "block";
      }
    }
  };
  xhttp.open("GET",query, true);
  xhttp.send();
}