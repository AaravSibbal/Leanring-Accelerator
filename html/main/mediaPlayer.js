//here play the definition that we have
let play = false
function handlePlayBtn(){
    print("play: "+play)
    togglePlay()
    if(play === false){
        playBtn.innerHTML = "Pause"
        folder = getFolder()
        for(let i=0; i<folder.definitions.length; i++){
            txt = folder.definitions[i]
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
function playerIsLive(){
    folder = getFolder()
    if(folder.definitions.length >= 0){
        playBtn.disabled = false
        nextBtn.disabled = false
        prevBtn.disabled = false
    }
}