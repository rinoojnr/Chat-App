const userNumber = document.getElementById('user-phone');
const userPassword = document.getElementById('user-password');
const loginForm = document.getElementById('login-form');

const baseURL = `http://localhost:3001`;

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const userData = {
        usernumber: userNumber.value,
        userpassword: userPassword.value
    }
    axios.post(`${baseURL}/user/login`,userData)
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        alert(res.data.message)
        window.location.href = "../Chat/home.html";
    })
    .catch((err)=>{
        console.log(err)
        alert(err.response.data.message)
    })
})