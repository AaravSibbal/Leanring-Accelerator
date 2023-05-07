


submitBtn.addEventListener("click", handleSubmit)
backBtn.addEventListener("click", handleBackBtn)
function addingTheEventListener(folderName){
    let r_id = "r_"+folderName
    let folderBtn = document.getElementById(folderName)
    let removeBtn = document.getElementById(r_id)
    if((folderBtn !== null) && (removeBtn !== null)){
        folderBtn.addEventListener("click", ()=>handleFolderButton(folderName))
        removeBtn.addEventListener("click", ()=>handleFolderRemoveButton(folderName))
    
    }
    
}
fileSelector.addEventListener('change', (event) => {
    handleFile(event)
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
            handleRemoveDef(event)
            
        })
    }
    
}
playBtn.addEventListener("click", ()=>{
    handlePlayBtn()
})
prevBtn.addEventListener("click", ()=>{
    handlePrevBtn()
})
nextBtn.addEventListener("click", ()=>{
    handleNextBtn()
})
