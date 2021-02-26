
const villagersList = document.getElementById("villagersList"); 
console.log("inside render.js");

const Http = new XMLHttpRequest(); 
const url = 'http://localhost:8000/villagers'; 
Http.open("GET", url); 
Http.send(); 

Http.onreadystatechange = (e) => {
    console.log("in response");
    console.log("response " + Http.responseText); 
}

