let play = false
function handlePlayBtn(){
    togglePlay()
    if(play === false){
        playBtn.innerHTML = "Pause"
        let folder = getFolder()
        for(let i=0; i<folder.definitions.length; i++){
            let txt = folder.definitions[i]
            speak(txt)
        }
    }
    if(play == true){

    }
}

function togglePlay(){
    if(play == false){
        play = true;
    }
    if(play = true){
        play = false
    }
}
/**
 * both the prev and next button are going to be abled when play button is toggeled
 */
function handlePrevBtn(){

}
function handleNextBtn(){

}
function toggleMediaPlayer(){
    let folder = getFolder()
    if(folder.definitions.length > 0){
        playBtn.disabled = false
        nextBtn.disabled = false
        prevBtn.disabled = false
    }
    else{
        playBtn.disabled = true
        nextBtn.disabled = true
        prevBtn.disabled = true
    }
}