// document.forms[0] //Another way to grab the form
var form = document.getElementById("signup");
var username = document.getElementById("username");
var password = document.getElementById("pass");

username.addEventListener("keyup", validateUsername);
form.addEventListener("submit", validateForm);
password.addEventListener("keyup", validatePassword);
password.addEventListener("focus", showRules)
password.addEventListener("blur", hideRules)


function validateForm(event){
    event.preventDefault();
    let formValid = true;
    let status = document.getElementById("status");

    if(!validateUsername()){
        formValid = false;
    }

    if(!validatePassword()){
        formValid = false;
        showRules()
    }

    if(formValid){
        status.textContent = "Status: The form is VALID! Submitting...";
    } else{
        status.textContent = "Status: The form is INVALID! ERRORS SOMEWHERE";
    }
}

function validateUsername(){
    let size = username.value.length;
    let message = document.getElementById("userError");

    if(size >= 3 && size <= 20){
        message.textContent = "";
        username.className = "validInput";
        return true;
    } else{
        message.textContent = "Username must be between 3 and 20 characters";
        username.className = "invalidInput";
        return false;
    }
}

function validatePassword(){
    let rules = document.querySelectorAll(".rulesList li");
    //rules is an ARRAY with all list items in this rulesList
    for(item of rules){
        item.className = "validRule";
    }
    
    let size = password.value.length;
    let isValid = true;

    if(size < 8){
        rules[0].className = "invalidRule";
        isValid = false;
    }

    let lowerCase = /[a-z]/.test(password.value);
    if(!lowerCase){
        rules[1].className = "invalidRule";
        isValid = false;
    }

    let upperCase = /[A-Z]/.test(password.value);
    if(!upperCase){
        rules[2].className = "invalidRule";
        isValid = false;
    }

    let specialChar = /[!@#$%&*]/.test(password.value);
    if(!specialChar){
        rules[3].className = "invalidRule";
        isValid = false;
    }

    if (isValid){
        password.className = "validInput"
    } else{
        password.className = "invalidInput"
    }
    
    return isValid;
}

function showRules(){
    document.getElementById("pwdRules").className = "showItem";
}

function hideRules(){
    if(validatePassword()){
        document.getElementById("pwdRules").className = "hideItem";
    } else{
        document.getElementById("pwdRules").className = "showItem";
    }
}