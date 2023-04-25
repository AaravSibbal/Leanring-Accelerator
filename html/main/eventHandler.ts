const handlerFunction = require("/index.ts")


handlerFunction.submitBtn.addEventListener("click", handlerFunction.handleSubmit)
handlerFunction.backBtn.addEventListener("click", handlerFunction.handleBackBtn)
function addingTheEventListener(folderName){
    let r_id = "r_"+folderName
    let folderBtn = document.getElementById(folderName)
    let removeBtn = document.getElementById(r_id)
    if((folderBtn !== null) && (removeBtn !== null)){
        folderBtn.addEventListener("click", ()=>handlerFunction.handleFolderButton(folderName))
        removeBtn.addEventListener("click", ()=>handlerFunction.handleFolderRemoveButton(folderName))
    
    }
    
}
handlerFunction.fileSelector.addEventListener('change', (event) => {
    handlerFunction.handleFile(event)
    /*
    const fileList = event.target.files;
    console.log(fileList);
    handleFile()
    */
    
  });
function addingTheRemoveDefEvent(id){
    console.log(document.getElementById(id))
    let buttonId = document.getElementById(id)
    if(buttonId !== null){
        buttonId.addEventListener("click", (event)=>{
            handlerFunction.handleRemoveDef(event)
            
        })
    }
    
}
handlerFunction.playBtn.addEventListener("click", ()=>{
    handlerFunction.handlePlayBtn()
})
handlerFunction.prevBtn.addEventListener("click", ()=>{
    handlerFunction.handlePrevBtn()
})
handlerFunction.nextBtn.addEventListener("click", ()=>{
    handlerFunction.handleNextBtn()
})
