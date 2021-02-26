const fs = require("fs");                                   // file handling variable = fs
const http = require('http'); 
const port = 8000; 
const Villager = require('./villager.js'); 
const villagers = []; 


async function createAndListenServer() {
    const server = http.createServer(function(req, res) {   // create server
        // handles server activity:

        console.log(req.url); 
        if (req.url == '/villagers') {
            console.log("inside req.url == './villagers'");
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(villagers)); 
        } else {

            res.writeHead(200, {'Content-Type': 'text/html'})               // tells browser we're writing HTML
            if (req.url == '/') {
                req.url = "/index.html";    
            }  
            fs.readFile(__dirname + req.url, function(error, data) {        // read the HTML file
                if (error) {                                                // error in reading HTML file
                    res.writeHead(404);                                     // write 404 and error message to browser
                    res.write('Error: File Not Found');             
                } else {                                                    // successfully read HTML file
                    res.write(data);                                        // write data from HTML file    
                }
                res.end();                                                  // end called after write
            })
        }
    })
    
    server.listen(port, function(error) {                                   // set up server to listen on port 
        console.log(villagers.length);
        // for (villager of villagers) {
        //     console.log(villager.name); 
        // }
        if (error) {                                                        // error in server listening on port
            console.log("uh oh, something went wrong", error);
        } else {                                                            // server successfully listening on port 
            console.log("Listening on port: "+ port); 
        }
    })
}
async function getVillagers() {
    return new Promise ((resolve, reject) => {
        http.get('http://acnhapi.com/v1/villagers/', (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });               // result append data in chunks
            res.on('end', () => {                                           // once end of data
                const allVillagers = Object.values(JSON.parse(rawData));    // array of villager objects

                for (let v of allVillagers) {                               // go through villagers
                    let villager = new Villager(v.name["name-USen"], v.id, v.species, v.gender, v.personality, v.hobby, v["catch-phrase"], false);
                    villagers.push(villager); 
                }
                resolve();
            });
        }).on('error', (error) => {
            console.log(error); 
            reject();
        });  
    })
}


getVillagers().then(() => { 
    return createAndListenServer(); 
})



// async/await
// promises
// wrap http.get in a promise

