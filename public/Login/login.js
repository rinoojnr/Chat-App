const userNumber = document.getElementById('user-phone');
const userPassword = document.getElementById('user-password');
const loginForm = document.getElementById('login-form');

const baseURL = `http://localhost:3000`;

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const userData = {
        usernumber: userNumber.value,
        userpassword: userPassword.value
    }
    axios.post(`${baseURL}/user/login`,userData)
    .then((res)=>{
        alert(res.data.message)
    })
    .catch((err)=>{
        alert(err.response.data.message)
    })
})