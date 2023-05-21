//TODO: please make a new file called database functions and add all the database functions on it 

const http = require('http') //need to http
const fs = require('fs') //need to read static files
const url = require('url')  //to parse url stringsimport * as db from "./serverRoutes.js" 
const db = require("./serverRoutes.js")

const loginURLS = ['/login.js','/loginHandler.js','/login.css','/loginUser.js','login.html' ]
const signupURLS = ['/signup.js','/signupHandler.js','/signup.css','/signupUser.js','signup.html' ]

const mainURLS = ["/index.html","/script/index.js","/script/eventHandler.js","/script/mediaPlayer.js","/script/textToSpeech.js","/script/user.js","/style.css"]
const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'txt': 'text/plain'
}

function get_mime(filename) {
    for (let ext in MIME_TYPES) {
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return MIME_TYPES[ext]
        }
    }
    return MIME_TYPES['txt']
}

function textToArray(text){
    arr = text.split("\n")
    return arr;
}

http.createServer(function (request,response){
    let urlObj = url.parse(request.url, true, false)
    console.log('\n============================')
	console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    let recievedData = ""

    request.on('data', function(chunk){
        recievedData += chunk

    })

    let dataObj = undefined
    let returnObj

    request.on("end", function(){
        console.log(`recieved data: ${recievedData}`)
        console.log(`type: ${typeof recievedData}`)

        if(request.method === "POST"){
            dataObj = JSON.parse(recievedData)
            console.log(`Recieved data Object: ${dataObj}`)
            console.log(`type: ${typeof dataObj}`)
            //I am only doing this for now I don't really 
            //`know how I want to configure my post requests
            console.log(`USER REQUEST: ${dataObj.text}`)
        }
        if(request.method === "POST" && urlObj.pathname === "/fileRead"){
            dataObj = JSON.parse(recievedData)
            let arr = textToArray(dataObj.text)
            returnObj = arr
            
            console.log("this is responseJSON: "+returnObj)
            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
            
        }

        // recieved data object: username, password
        if(request.method === "POST" && urlObj.pathname === "/checkUser"){
            dataObj = JSON.parse(recievedData)
    
            returnObj = {isValid: db.doesUserExist};// chenge the true to a function call to the server
            console.log("this is responseJSON: "+returnObj)
            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
            
        }

        if(request.method === "POST" && urlObj.pathname === "/createUser"){
            dataObj = JSON.parse(recievedData)
            console.log(dataObj.userEmail, dataObj.userPassword)
            returnObj =  {"isValid": db.addUser(dataObj.userEmail, dataObj.userPassword)};// chenge the true to a function call to the server
            console.log("this is responseJSON: "+returnObj.toString())

            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
            
        }
        if(request.method ==="POST" && urlObj.pathname === "/deleteFolder"){
            dataObj = JSON.parse(recievedData)
            let userData = {}
            userData = Object.assign(dataObj, userData)
            db.removeFolder(userData.userEmail, userData.folderName)
            returnObj = "we are going to delete the folder now"
            
            console.log("this is responseJSON: "+returnObj)
            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
        }
        if(request.method ==="POST" && urlObj.pathname === "/addFolder"){
            dataObj = JSON.parse(recievedData)
            let userData = {}
            userData = Object.assign(dataObj, userData)
            //TODO: please make actually remove it from the database and add the DeleteFolderFromDB()
            db.addFolder(userData.userEmail, userData.folderName)
            returnObj = "we are going to delete the folder now"
            
            console.log("this is responseJSON: "+returnObj)
            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
        }

        if(request.method ==="POST" && urlObj.pathname === "/deleteDefinition"){
            dataObj = JSON.parse(recievedData)
            let userData = {}
            userData = Object.assign(dataObj, userData)
            //TODO: please make actually remove it from the database and add the DeleteFolderFromDB()
            db.removeDefinitions(userData.userEmail, userData.folderName, userData.definition)
            returnObj = {text: "we are going to delete the definition now"}
            
            console.log("this is responseJSON: "+returnObj)
            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
        }
        if(request.method ==="POST" && urlObj.pathname === "/addDefinition"){
            dataObj = JSON.parse(recievedData)
            let userData = {}
            userData = Object.assign(dataObj, userData)
            //TODO: please make actually remove it from the database and add the DeleteFolderFromDB()
            db.addDefinition(userData.userEmail, userData.folderName, userData.definition)
            
            returnObj = {text: "we are going to delete the definition now"}
            
            console.log("this is responseJSON: "+returnObj)
            response.writeHead(200, {
                "Content-type": MIME_TYPES["json"]
            })
            response.end(JSON.stringify(returnObj));
        }

        if(request.method === "GET"){

            let filePath = ROOT_DIR + urlObj.pathname
            if(loginURLS.includes(urlObj.pathname)){
                filePath = ROOT_DIR + "/login" + urlObj.pathname
            }
            if(mainURLS.includes(urlObj.pathname)){
                filePath = ROOT_DIR + "/main" + urlObj.pathname
            }
            if(signupURLS.includes(urlObj.pathname)){
                filePath = ROOT_DIR + "/signup" + urlObj.pathname
            }
            if(urlObj.pathname === '/') filePath = ROOT_DIR + '/signup/signup.html'
            console.log("FILE PATH REQUSTED: "+ filePath)

            fs.readFile(filePath, function(err,data){
                if(err){
                    //report error to console
                    console.log('ERROR: ' + JSON.stringify(err))
                    //respond with not found 404 to client
                    response.writeHead(404)
                    response.end(JSON.stringify(err))
                    return
                    }
                    response.writeHead(200, {'Content-Type': get_mime(filePath)})
                    response.end(data)
            })
        }
    })
}).listen(3000)

console.log('Server Running at Port 3000  CNTL-C to quit')
console.log('To Test:')
console.log('http://localhost:3000/login/login.html')
