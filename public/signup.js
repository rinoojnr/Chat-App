const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPassword = document.getElementById('user-password');
const userConfirmPassword = document.getElementById('user-confirm-password');
const signUpForm = document.getElementById('signup-form');




signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const useraData ={
        username: userName.value,
        useremail: userEmail.value,
        userpassword: userPassword.value,
        userconfirmpassword: userConfirmPassword.value
    }
    // axios.post()
})

