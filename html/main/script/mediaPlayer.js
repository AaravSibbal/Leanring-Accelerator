let mediaPlayer = {

    currIndex: null,//null means that nothing has been played yet
    isPlaying: false,
}

//this is for when we wan to change to a diferent folder
function folderChange(){
    mediaPlayer.currIndex = null;
    isPlaying = false
}



function handlePlayBtn(){
    togglePlay()//because it is pressed everything must change now
    let folder = getFolder()
    //this is when media player has already run once 
    //so we would need to resume because it was paused once
    if((mediaPlayer.isPlaying) && (mediaPlayer.currIndex !== null)){
        playBtn.innerText = "Pause"
        speechSynthesis.resume()
        speakDefinitions(folder)
        //loop(folder)
    }
    //we are starting for the first time and we initialize the curr index
    else if((mediaPlayer.isPlaying) && (mediaPlayer.currIndex === null)){
        //console.log("is this the thing that is working")
        //speechSynthesis.resume()//just trying
        playBtn.innerText = "Pause"
        mediaPlayer.currIndex = 0;
        speakDefinitions(folder)
        //loop(folder)
    }
    //we need to pause whatever is playing
    else if((!mediaPlayer.isPlaying) && (mediaPlayer.currIndex !== null)){
        playBtn.innerText = "Play"
        speechSynthesis.pause()
    }
}

function loop(folder){
    let idx  = mediaPlayer.currIndex
    let folderLen = folder.definitions.length
    if(idx === folderLen || idx > folderLen){
        mediaPlayer.currIndex = 0
    }
}

// TODO: I need to change the speech definitions in the sense that
// I only add definitions when the next one starts playing
function speakDefinitions(folder){
    console.log("this is the current index: "+mediaPlayer.currIndex)
    console.log("this is the folder definitions: "+ typeof folder.definitions)
    while((mediaPlayer.currIndex) < folder.definitions.length){
        speak(folder.definitions[mediaPlayer.currIndex])
        console.log(folder.definitions[mediaPlayer.currIndex])
        mediaPlayer.currIndex++//to be used when paused
        
    }
    playIsOver()
    
}

function playIsOver(){
    mediaPlayer.currIndex = null
    playBtn.innerText = "Play"
    togglePlay()
}

function togglePlay(){
    if(mediaPlayer.isPlaying){
        mediaPlayer.isPlaying = false;
    }
    else{
        mediaPlayer.isPlaying = true
    }
    console.log("play is toggled")
}
/**
 * both the prev and next button are going to be abled when play button is toggeled
 */
function handlePrevBtn(){
    mediaPlayer.currIndex--
    speakDefinitions(getFolder())
}
function handleNextBtn(){
    mediaPlayer.currIndex++
    speakDefinitions(getFolder())
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