const notification = document.getElementById('notification-div');
const usersDetailes = document.getElementById('users-detailes-div');
const chatView = document.getElementById('chat-div');
const chatBox = document.getElementById('chat');
const sendButton = document.getElementById('send');

const baseURL = `http://localhost:3001`;


window.addEventListener('DOMContentLoaded',()=>{
    setInterval(myfunction,1000);
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/home/chatusers`,{headers: {"Authentication": token}})
    .then((res)=>{
        if(res.data.isAlive === false){
            alert("Timer Expired Please Login Again")
            window.location.href = "../Login/login.html";
        }else{
            let loginDetailes = ``;
            loginDetailes+= `<h4> You are joined </h4>`;
            for(let i=0;i<res.data.users.length;i++){
                loginDetailes+= `<p>`+ res.data.users[i].username +` joined<p>`
            }
            document.getElementById('users-detailes-div').innerHTML = loginDetailes;
        } 
    })
    .catch((err)=>{
        console.log("tutu")
    }) 
})



sendButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const chatData = {
        chat:chatBox.value
    }
    const token = localStorage.getItem('token');
    console.log(chatData)
    axios.post(`${baseURL}/home/chat`,chatData,{headers: {"Authentication": token}})
    .then((res)=>{
        console.log(res,".....")
    })
})


function myfunction(){
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/home/chats`,{headers: {"Authentication":token}})
    .then((res)=>{
    console.log(res)
    let chatviewInner =``;
    for(let i=0;i<res.data.chats.length;i++){
        chatviewInner+=`<li>`+ res.data.chats[i].userName + `:` + res.data.chats[i].chat +`</li>`;
    }
    document.getElementById('chat-div').innerHTML = chatviewInner;
    })
}