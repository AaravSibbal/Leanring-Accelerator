/**
 * this is to be used when the user has already made an account
 * with us and now just wants to sign in
 */
const loginSubmitBtn = document.querySelector("#submit-btn")
const loginUsernameInput = document.querySelector("#username-field")
const loginPasswordInput = document.querySelector("#password-field")
const loginValidityMsg = document.querySelector("#msg")

function handleLoginSubmit(){
    let username = loginUsernameInput.value
    let password = loginPasswordInput.value
    checkValidity(username, password)
    

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
    xhttp.open("POST", "checkUser")
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
        loginUser.mail = loginUsernameInput.value;
        loginUser.password = loginPasswordInput.value;
        // validityMsg.innerHTML = "do better"
        console.log(loginUser.password)
    }
    else{
        console.log(passwordMsg)
    }
}


