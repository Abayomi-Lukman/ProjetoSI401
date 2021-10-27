'use strict'

function handleSubmit() {
    const usernameElement = document.querySelector('#username');
    const passwordElement = document.querySelector('#password');
    console.log(usernameElement.value);
    console.log(passwordElement.value);


    if(usernameElement.value && passwordElement.value) {
        window.location.href = '/home.html';
    }else {
        alert('Não esqueceu de digitar algum dos dados ?');
    }

    return false;
}

