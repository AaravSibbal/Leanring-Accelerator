


const textField = (document.getElementById("text-field"))
const submitBtn = document.getElementById("submit-btn")
const list = document.getElementById("list")
const backBtn = document.getElementById("back-btn")
const instrucPara = document.getElementById("instructions")
const fileSelector = document.getElementById("file-selector")
const playBtn = document.getElementById("play-btn")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")



window.onload = ()=>{
    ((fileSelector)).disabled = true;
    
}


document.onkeyup = function() {
    if(textField.value !== ""){
        submitBtn.disabled = false;
    }
}
document.onkeydown = function(e){
    
    if(e.key === "Enter"){
        if(submitBtn.disabled === false){
            handleSubmit()
            
        }
    }
}

/**
 * this will basically chnage the innerhtml of the list
 * based upon if we are inside the folder or not 
 */
function changingTheList(){
    //if we are inside a folder get the information inside te folder and 
    //put it in the list
    if(user.isInsideAFolder){
        let folder = getFolder()
        let len = folder.definitions.length
        
        if(len === 0){
            list.innerHTML = "Add something to the folder"
            //TODO: check if there are definition inside the folder
            //else just show that there are nothing inside the folder    
        }

        /**
         * we are in a folder and the list is not empty
         */
        else{
            list.innerHTML = ""
            for(let i=0; i<folder.definitions.length; i++){
                let id = `${folder.name}-${i}`
                let listElem = document.createElement("li")
                listElem.innerText = folder.definitions[i]
                let btn = createButtonHTML("-", id)
                listElem.appendChild(btn)
                list.appendChild(listElem)
                addingTheRemoveDefEvent(id)
            }
        }
        
    }
    else{
        list.innerHTML = ""
        for(let i=0; i<user.folderNames.length; i++){
            let folderName = user.folderNames[i]
            let listElem = document.createElement("li")
            let folderBtn = createButtonHTML(folderName, folderName)
            let removeFolderBtn = createButtonHTML("-", `r_${folderName}`)
            listElem.appendChild(folderBtn)
            listElem.appendChild(removeFolderBtn)
            list.appendChild(listElem)
            addingTheEventListener(folderName)
            
        }
    }
}


function handleFolderButton(folderName){

    
    instrucPara.innerHTML = "Please use the following format while adding the definition:\n"+
                                "name: and here the explanation"
    user.isInsideAFolder = true
    fileSelector.disabled = false
    user.currDir = folderName
    submitBtn.innerHTML = "Add Definition"
    backBtn.disabled = false
    let folder = getFolder()
    if(folder.definitions.length === 0){
        instrucPara.innerHTML += "\n There is no definition you can use yet please add to continue"
    }
    
        
    changingTheList()
    


}
function handleBackBtn(){
    user.isInsideAFolder = false
    changingTheList()
    submitBtn.innerHTML = "Create Folder"
    instrucPara.innerHTML = ""
}

/**
 * 
 * @returns a folder object with definitions
 */
function getFolder(){
    let idx = user.folderNames.indexOf(user.currDir)
    return user.folders[idx]
}

/**
 * here now I just want to get the text to speech 
 * for that I first need to extract the text of the file and save it 
 * in an array and then just put that array values in to make a track
 * list
 */
function handleFile(event){
    let userRequestJSON;
    userRequestJSON = {text: ""};
    let input = event.target
    let textResult

    let reader = new FileReader();
    reader.onload = function(){
      textResult = reader.result;
      userRequestJSON.text = textResult
      userRequestJSON = JSON.stringify(userRequestJSON)
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange= ()=>{
          if(xhttp.readyState == 4 && xhttp.status == 200){
              let responseObj = JSON.parse(xhttp.responseText)
              for(let i=0; i<responseObj.length; i++){
                let folder = getFolder()
                let txt = responseObj[i]
                if(txt !== ""){
                    folder.definitions.push(txt)
                }
              }
              changingTheList()
              console.log(user)
          }
          
      }
      xhttp.open("POST", "fileRead")
      xhttp.send(userRequestJSON)
    };
    reader.readAsText(input.files[0]);
    
    
}

function handleFolderRemoveButton(folderName){
    let userRequestJSON;
    userRequestJSON = {
        folderID: user.folderID,
        userID: user.userID,
        folder_Name: folderName
    };
    userRequestJSON = JSON.stringify(userRequestJSON)
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange= ()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
            //then do nothing because it is done lol
            let responseObj = JSON.parse(xhttp.responseText)
            console.log(responseObj)
        }
        
    }
    xhttp.open("POST", "deleteFolder")
    xhttp.send(userRequestJSON)
    
    let idx = user.folderNames.indexOf(folderName)

    //changing the foldernammes arr and the folders arr
    user.folderNames.splice(idx, 1)
    user.folders.splice(idx, 1)
    changingTheList()
}

function changingTheFolderName(str){
    let idx = str.indexOf(" ")
    if(idx === -1){
        //the world is good 
        return str
    }
    else{
        while(idx !== -1){
            let strFront = str.slice(0, idx)
            strFront += "-"
            let strBack = str.slice(idx+1)
            str = strFront+strBack
            idx = str.indexOf(" ")
        }
        return str
    }
}

function handleRemoveDef(event){
    let id = event.target.id // get the id of the button element 
    let idx = id.split("-")[1]//because the way id is made foldername-index in the definitions
    idx = Number(idx)
    let btn = document.getElementById(id) //getting to use the button element
    if(btn !== null){
        let folder = getFolder()

        //changing the defninitions folders arr
        folder.definitions.splice(idx, 1)
        changingTheList()  
        toggleMediaPlayer()
        
    }
    
}

/**
 * creating a button
 * setting it's id
 * and naming the button
 */
function createButtonHTML(value, id){
    let btn = document.createElement("button")
    btn.setAttribute("id", `${id}`)
    btn.innerText = value
    return btn
}

function handleSubmit(){
    /**
     * create a folder if the name is unique
     * also add an event handler with the same name because 
     * the name is already unique 
     * 
     */
    if(!user.isInsideAFolder){
        let folderName = textField.value
        let folderNameIdx = user.folderNames.indexOf(folderName)
        if(folderNameIdx === -1){
            folderName = changingTheFolderName(folderName)
            let folder= {
                name: folderName,
                definitions: []
            }
            user.folders.push(folder)
            user.folderNames.push(folderName)
            changingTheList()
            textField.value = ""
            submitBtn.disabled = true;
    
        }
        else{
            alert("Folder already exists")
        }
        
    }
    /**
     * get the information inside that folder and populate the list
     */
    else{
        let folder = getFolder()
        let txt = textField.value
        txt = txt.trim()
        textField.value = ""
        if(txt !== ""){
            folder.definitions.push(txt)
            changingTheList()//this just renders the list again
        }
        toggleMediaPlayer()
        
    }
    
}
