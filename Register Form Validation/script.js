const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

function showError(input, message){
  const formControl = input.parentElement;
  formControl.className="form-control error";
  const small = formControl.querySelector("small");
  small.innerText=message;
}

function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className="form-control success";
}

function checkEmail(input){
  const valid = String(input.value.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );  
    if (valid){
      showSuccess(input);
    }else{
      showError(input, "Email is not valid");
    }
}

function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkRequired(inputArray){
  inputArray.forEach(input => {
    if(input.value.trim() === ""){
      showError(input, getFieldName(input) + " is required");
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input,min,max){
  if(input.value.length<min ){
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  }else if(input.value.length>max ){
    showError(input, `${getFieldName(input)} must be at most ${max} characters`);
  }else {
    showSuccess(input);
  }
}

function checkPasswordsEqual(input1,input2){
  if(input1.value!==input2.value)
    showError(input2, "Passwords do not match");
  
}

form.addEventListener("submit", function(e){
  e.preventDefault();
  
  checkRequired([username,email,password,password2]);
  checkLength(username,3,15);
  checkLength(password,6,25);
  checkEmail(email);
  checkPasswordsEqual(password,password2);

  /*
  if(username.value===""){
    showError(username,"Username is required");
  }else{
    showSuccess(username);
  }

  if(email.value===""){
    showError(email,"Email is required");
  }else if(! isValidEmail(email.value)){
  showError(email,"Email is not valid");
  }else{
    showSuccess(email);
  }


  if(password.value===""){
    showError(password,"Password is required");
  }else{
    showSuccess(password);
  }

 */

});
