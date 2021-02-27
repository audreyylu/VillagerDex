
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
        <li class="villager">
            <h2>${villager.name}</h2>
            <img src="${villager.imageURL}"></img>
        </li>`; 
    }).join('');
    villagersList.innerHTML = htmlString; 
}

// event: value in search bar
searchBar.addEventListener('keyup', (e) => {
    const searchValue =e.target.value;

    const filteredVillagers = villagersArray.filter( villager => {
        return villager.name.includes(searchValue) || 
        villager.species.includes(searchValue) || 
        villager.personality.includes(searchValue);
    })
    displayVillagers(filteredVillagers); 

})
