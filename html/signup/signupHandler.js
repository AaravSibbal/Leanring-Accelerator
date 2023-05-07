signupSubmitBtn.addEventListener("click", ()=>{
    handleSignupSubmit()
})

signupPasswordInput.addEventListener("change", ()=>{
    console.log("changed")
    //the user has entered a username and passwords are confirmed
    if(inputValuesCheck){
        isPassWordGood()
    }
    else{
        signupSubmitBtn.disabled = true
    }

    
    
})
document.onkeydown = function(e){
    
    if(e.key === "Enter"){
        if(signupSubmitBtn.disabled === false){
            handleSignupSubmit()//handles if we are inside a folder or not
            
        }
    }
    /**
    if(inputValuesCheck){
        isPassWordGood()
    }
    else{
        signupSubmitBtn.disabled = true
    }
     */
}
document.onkeyup= ()=>{
    if(inputValuesCheck){
        isPassWordGood()
    }
    else{
        signupSubmitBtn.disabled = true
    }
}


signupShowPassword.addEventListener("change",(e)=>{
    console.log("this is reached")
    if(e.target.checked){
        signupConfirmPasswordInput.type = "text"
        signupPasswordInput.type = "text"
    }
    else{
        signupConfirmPasswordInput.type = "password"
        signupPasswordInput.type = "password"
    }
})