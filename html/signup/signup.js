const signupSubmitBtn = document.querySelector("#submit-btn")
const signupUsernameInput = document.querySelector("#username-field")
const signupPasswordInput = document.querySelector("#password-field")
const signupConfirmPasswordInput = document.querySelector("#confirm-password-field")
const signupValidityMsg = document.querySelector("#msg")
const signupShowPassword = document.querySelector("#show-password")

function handleSignupSubmit(){
    checkValidity(signupUsernameInput.value, signupPasswordInput.value)
    console.log("we are signing this person up")
}

let goodPasswordChars = []
function addingGoodChars(){
    for(let i=0; i<10; i++){
        goodPasswordChars.push(`${i}`)
    }
    goodPasswordChars.push("!","@","#","$","%","^","&","*","(",")","'","/" )    
}

window.onload = ()=>{
    signupSubmitBtn.disabled = true;
    addingGoodChars()
}

function inputValuesCheck(){
    console.log(signupConfirmPasswordInput.value +" "+signupPasswordInput.value)
    if((signupUsernameInput.value !== "") && (signupPasswordInput !== "")&& (signupConfirmPasswordInput !== "")){
        if((signupPasswordInput.value === signupConfirmPasswordInput.value)){
            return true;
        }
    }
    return false;
}

function includesGoodChars(pass){
    for(let i=0; i<goodPasswordChars.length; i++){
        if(pass.includes(goodPasswordChars[i])){
            return true
        }   
    }
    return false
}

function isPassWordGood(){
    if(signupPasswordInput.value === signupConfirmPasswordInput.value){
        let pass = signupPasswordInput.value
        if((pass.length >= 8)&&(includesGoodChars(pass))){
            signupSubmitBtn.disabled = false
            signupValidityMsg.innerHTML = ""
        }
        else{
            signupSubmitBtn.disabled = true;
            signupValidityMsg.innerHTML = "Please make sure the length is greater than 8 and to include either numbers or add a special charecter"
            
        }
    }
    else{
        signupSubmitBtn.disabled = true
        signupValidityMsg.innerHTML = "Please make sure that the passwords match"
            
    }
}





function checkValidity(username, password){
    let userRequestJSON;
    userRequestJSON = {
        text: "please give me me data because hello hi this is I "+username,
        username: username,
        password: password,
    };
    userRequestJSON = JSON.stringify(userRequestJSON)
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange= ()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
            //then do nothing because it is done lol
            let responseObj = JSON.parse(xhttp.responseText)
            responseToUser(responseObj.isValid)
            console.log("this place is reached")
        }
        
    }
    xhttp.open("POST", "createUser")
    xhttp.send(userRequestJSON)
    console.log("what about here")
    
}



function responseToUser(isValid){
    console.log("this place is reached")
    if(isValid){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/main/index.html`);

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            let DOM = document.querySelector("html")
            DOM.remove()
            document.write(xhr.responseText)
            console.log(document.querySelector("html"))
        }};

        xhr.send();
        signupUser.mail = signupUsernameInput.value;
        signupUser.password = signupPasswordInput.value;
        // validityMsg.innerHTML = "do better"
        console.log(signupUser.password)
    }
    else{
        signupValidityMsg.innerHTML = "this user already exists please create a new login"
        console.log(passwordMsg)
    }
}


