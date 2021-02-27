
const villagersList = document.getElementById("villagersList"); 
const searchBar = document.getElementById("search-bar"); 
console.log("inside render.js");
let responseObj = null;
let villagersArray = [];

const Http = new XMLHttpRequest(); 
const url = 'http://localhost:8000/villagers'; 
Http.open("GET", url); 
Http.send(); 

Http.onreadystatechange = (e) => {
    /*
    console.log("in response");
    console.log("response as string: " + Http.responseText); 
    console.log("type: " + typeof Http.responseText);
    console.log("name: " + responseObj[0].name); 
    console.log("id: " + responseObj[0].id);
    console.log("species: " + responseObj[0].species);
    console.log("gender: " + responseObj[0].gender);
    console.log("personality: " + responseObj[0].personality);
    console.log("hobby: " + responseObj[0].hobby);
    console.log("catchphrase: " + responseObj[0].catchphrase);
    console.log("have: " + responseObj[0].have); 
    */

    responseObj = JSON.parse(Http.responseText);

    for (let villager of responseObj) {
        villagersArray.push(villager); 
    }
    console.log(villagersArray);
    displayVillagers(responseObj);
}

function displayVillagers(villagers) {
    const htmlString = villagers.map((villager) => {
        return `
        <div id="villager">
            
            <img id="villager-image" src="${villager.imageURL}"></img>
            <h3 id="villager-name">${villager.name}</h3>
            <p id="villager-info">Species: ${villager.species}<br>
            Gender: ${villager.gender}<br>
            Personality: ${villager.personality}</p>

        </div>`; 
    }).join('');
    villagersList.innerHTML = htmlString; 
}

searchBar.addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase(); 

    const filteredVillagers = villagersArray.filter( villager => {
        return villager.name.toLowerCase().includes(searchValue) || 
        villager.species.toLowerCase().includes(searchValue) || 
        villager.personality.toLowerCase().includes(searchValue);
    })
    displayVillagers(filteredVillagers); 

})
