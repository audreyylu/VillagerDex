
const villagersList = document.getElementById("villagersList"); 
console.log("inside render.js");
let responseObj = null;

const Http = new XMLHttpRequest(); 
const url = 'http://localhost:8000/villagers'; 
Http.open("GET", url); 
Http.send(); 

Http.onreadystatechange = (e) => {
    console.log("in response");
    console.log("response as string: " + Http.responseText); 
    console.log("type: " + typeof Http.responseText);
    
    responseObj = JSON.parse(Http.responseText);

    console.log("name: " + responseObj[0].name); 
    console.log("id: " + responseObj[0].id);
    console.log("species: " + responseObj[0].species);
    console.log("gender: " + responseObj[0].gender);
    console.log("personality: " + responseObj[0].personality);
    console.log("hobby: " + responseObj[0].hobby);
    console.log("catchphrase: " + responseObj[0].catchphrase);
    console.log("have: " + responseObj[0].have); 

    for (let villager of responseObj) {
        console.log(villager.name);
    }

    displayVillagers(responseObj);
}

// function displayVillagers(villagers) {
//     const htmlString = villagers.map((villager) => {
//         return `
//         <li class="villager">
//             <h2>${villager.name}</h2>
//             <img src="${villager.image}"></img>
//         </li>`; 
//     }).join('');
//     villagersList.innerHTML = htmlString; 
// }


function displayVillagers(villagers) {
    const htmlString = villagers.map((villager) => {
        return `
        <li class="villager">
            <h2>${villager.name}</h2>
        </li>`; 
    }).join('');
    villagersList.innerHTML = htmlString; 
}