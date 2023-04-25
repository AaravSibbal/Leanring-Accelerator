const userData = require("/user.ts")
const media = require("/mediaPlayer")



export const textField = (document.getElementById("text-field") as HTMLTextAreaElement)
export const submitBtn = ((document.getElementById("submit-btn")) as HTMLButtonElement)
export const list = ((document.getElementById("list")) as HTMLUListElement)
export const backBtn = ((document.getElementById("back-btn")) as HTMLButtonElement)
export const instrucPara = ((document.getElementById("instructions")) as HTMLParagraphElement)
export const fileSelector = ((document.getElementById("file-selector")) as HTMLInputElement)
export const playBtn = ((document.getElementById("play-btn")) as HTMLButtonElement)
export const prevBtn = ((document.getElementById("prev-btn")) as HTMLButtonElement)
export const nextBtn = ((document.getElementById("next-btn")) as HTMLButtonElement)



window.onload = ()=>{
    ((fileSelector) as HTMLButtonElement).disabled = true;
    
}


document.onkeyup = function() {
    if(textField.value !== ""){
        submitBtn.disabled = false;
    }
}
document.onkeydown = function(e: KeyboardEvent){
    
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
    if(userData.isInsideAFolder){
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
        for(let i=0; i<userData.user.folderNames.length; i++){
            let folderName = userData.user.folderNames[i]
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


export function handleFolderButton(folderName: string){

    
    let isFolderEmpty
    instrucPara.innerHTML = "Please use the following format while adding the definition:\n"+
                                "name: and here the explanation"
    userData.isInsideAFolder = true
    fileSelector.disabled = false
    userData.user.currDir = folderName
    submitBtn.innerHTML = "Add Definition"
    backBtn.disabled = false
    let folder = getFolder()
    if(folder.definitions.length === 0){
        instrucPara.innerHTML += "\n There is no definition you can use yet please add to continue"
        isFolderEmpty = true
    }
    else{
        isFolderEmpty = false
    }
        
    changingTheList()
    


}
export function handleBackBtn(){
    userData.isInsideAFolder = false
    changingTheList()
    submitBtn.innerHTML = "Create Folder"
    instrucPara.innerHTML = ""
}

/**
 * 
 * @returns a folder object with definitions
 */
export function getFolder(){
    let idx = userData.user.folderNames.indexOf(userData.user.currDir)
    return userData.user.folders[idx]
}

/**
 * here now I just want to get the text to speech 
 * for that I first need to extract the text of the file and save it 
 * in an array and then just put that array values in to make a track
 * list
 */
export function handleFile(event){
    let userRequestJSON: any;
    userRequestJSON = {text: ""};
    let input = event.target
    let textResult

    let reader = new FileReader();
    reader.onload = function(){
      textResult = reader.result;
      textResult = textResult.trim()
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
              console.log(userData.user)
          }
          
      }
      xhttp.open("POST", "fileRead")
      xhttp.send(userRequestJSON)
    };
    reader.readAsText(input.files[0]);
    
    
}

export function handleFolderRemoveButton(folderName: string){
    let userRequestJSON: any;
    userRequestJSON = {
        folderID: userData.user.folderID,
        userID: userData.user.userID,
        folder_Name: folderName
    };
    userRequestJSON = JSON.stringify(userRequestJSON)
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange= ()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
            //then do nothing because it is done lol
        }
        
    }
    xhttp.open("POST", "deleteFolder")
    xhttp.send(userRequestJSON)
    
    let idx = userData.user.folderNames.indexOf(folderName)

    //changing the foldernammes arr and the folders arr
    userData.user.folderNames.splice(idx, 1)
    userData.user.folders.splice(idx, 1)
    changingTheList()
}

function changingTheFolderName(str: string){
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

export function handleRemoveDef(event: any & {target: HTMLButtonElement}){
    let id = event.target.id // get the id of the button element 
    let idx: string | number = id.split("-")[1]//because the way id is made foldername-index in the definitions
    idx = Number(idx)
    let btn = document.getElementById(id) //getting to use the button element
    if(btn !== null){
        let parent = btn.parentElement  //because this is in the list element getting the list element
        let folder = getFolder()

        //changing the defninitions folders arr
        folder.definitions.splice(idx, 1)
        changingTheList()  
        media.playerIsLive()
        
    }
    
}

/**
 * creating a button
 * setting it's id
 * and naming the button
 */
function createButtonHTML(value: string, id: string){
    let btn = document.createElement("button")
    btn.setAttribute("id", `${id}`)
    btn.innerText = value
    return btn
}

export function handleSubmit(){
    /**
     * create a folder if the name is unique
     * also add an event handler with the same name because 
     * the name is already unique 
     * 
     */
    if(!userData.isInsideAFolder){
        let folderName = textField.value
        let folderNameIdx = userData.user.folderNames.indexOf(folderName)
        if(folderNameIdx === -1){
            folderName = changingTheFolderName(folderName)
            let folder = {
                name: folderName,
                definitions: []
            }
            userData.user.folders.push(folder)
            userData.user.folderNames.push(folderName)
            let folderLI = document.createElement("li")//creating the list element

            let folderBtn = createButtonHTML(folderName, folderName)
            
            /**
             * creating the remove folder button
             * setting it's id
             * adding the value to it
             */
            let remFolderBtn = createButtonHTML("-", `r_${folderName}`)
            folderLI.appendChild(folderBtn)
            folderLI.appendChild(remFolderBtn)
            list.appendChild(folderLI)
            addingTheEventListener(folderName)

            textField.value = ""
            
    
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
        /**
         * here the way id is set up is by making use of the definition lengths
         * and when you add each you just take the index of the definition to 
         * make a unique id but this is only because we are adding the definitions 
         * one at a time here and there is no need to over complicate this
         * 
         * also now that I am using the create element I think it is working better 
         * 
         */
        if(txt !== ""){
            folder.definitions.push(txt)
            let idx= folder.definitions.length-1
            let id = `${folder.name}-${folder.definitions.length-1}` 
            let remDefBtn = createButtonHTML("-", id)
            let listElem = document.createElement("li")
            listElem.innerText = `${txt}`
            listElem.setAttribute("id", `li-${id}`)
            listElem.appendChild(remDefBtn)
            list.appendChild(listElem)
            addingTheRemoveDefEvent(id)
            media.playerIsLive()
        }
        
    }
    
}
