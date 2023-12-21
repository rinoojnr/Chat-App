const notification = document.getElementById('notification-div');
const usersDetailes = document.getElementById('users-detailes-div');
const chatView = document.getElementById('chat-div"');
const chatBox = document.getElementById('chat');
const sendButton = document.getElementById('send');

const baseURL = `http://localhost:3000`;


window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/home/chat`,{headers: {"Authentication": token}})
    .then((res)=>{
        if(res.data.isAlive=false){
            alert("Session timeout")
            window.location.href = '../Login/login.html'
        }else{
            let loginDetailes = ``;
            loginDetailes+= `<h4> You are joined </h4>`;
            for(let i=0;i<res.data.users.length;i++){
                loginDetailes+= `<p>`+ res.data.users[i] +` joined<p>`
            }
            document.getElementById('users-detailes-div').innerHTML = loginDetailes;
        }
        
    })
    .catch((err)=>{
        console.log(err)
    })
})



sendButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const chatData = {
        chat:chatBox.value
    }
    const token = localStorage.getItem('token');
    axios.post(`${baseURL}/home/chat`,chatData,{headers: {"Authentication": token}})
    .then((res)=>{
        console.log(res,".....")
    })
})