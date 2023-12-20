const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userPassword = document.getElementById('user-password');
const userConfirmPassword = document.getElementById('user-confirm-password');
const signUpForm = document.getElementById('signup-form');

const baseURL = `http://localhost:3000`




signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const useraData ={
        username: userName.value,
        useremail: userEmail.value,
        userphone: userPhone.value,
        userpassword: userPassword.value,
        userconfirmpassword: userConfirmPassword.value
    }
    axios.post(`${baseURL}/user/signup`,useraData)
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        alert(res.data.message);
    })
    .catch((err)=>{
        alert(err.response.data.message)
    })
})

