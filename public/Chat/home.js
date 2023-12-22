const notification = document.getElementById('notification-div');
const usersDetailes = document.getElementById('users-detailes-div');
const chatView = document.getElementById('chat-div');
const chatBox = document.getElementById('chat');
const sendButton = document.getElementById('send');

const baseURL = `http://localhost:3001`;


// const t = [{"userName":"Ramu","chat":"mandooos","chatId":4},{"userName":"Aswin C V","chat":"Hii","chatId":5},{"userName":"Aswin C V","chat":"kooi","chatId":6},{"userName":"Aswin C V","chat":"enthada","chatId":7},{"userName":"Ramu","chat":"onnulla","chatId":8},{"userName":"Aswin C V","chat":"haaa","chatId":9},{"userName":"Aswin C V","chat":"oggey","chatId":10},{"userName":"Rinooj N R","chat":"hoooo","chatId":11},{"userName":"Aswin C V","chat":"new feature engane indu","chatId":12},{"userName":"Aswin C V","chat":"da","chatId":13},{"userName":"Rithuna ","chat":"Hi gys","chatId":14},{"userName":"Rithuna ","chat":"Aarulle","chatId":15},{"userName":"Rithuna ","chat":"aaaa","chatId":16}]
// localStorage.setItem('chats',JSON.stringify(t))

window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');

    axios.get(`${baseURL}home/lastchats`).then(res=>{
        localStorage.setItem("last10",JSON.stringify(res.data.chats))
    })

    setInterval(myfunction,1000);
 
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
    // const token = localStorage.getItem('token');
    // axios.get(`${baseURL}/home/chats`,{headers: {"Authentication":token}})
    // .then((res)=>{
    // let chatviewInner =``;
    // for(let i=0;i<res.data.chats.length;i++){
    //     chatviewInner+=`<li>`+ res.data.chats[i].userName + `:` + res.data.chats[i].chat +`</li>`;
    // }
    // document.getElementById('chat-div').innerHTML = chatviewInner;
    // })
    ;


    const token = localStorage.getItem('token');
    const chatLength = JSON.parse(localStorage.getItem('last10')).length
    const id =JSON.parse(localStorage.getItem('last10'))[chatLength-1].chatId;
    axios.get(`${baseURL}/home/newchats?lastmessageid=${id}`,{headers: {"Authentication": token}})
    .then((res)=>{
        console.log(res.data.chats.length)
        // console.log(JSON.parse(localStorage.getItem('last10')).length-res.data.chats.length);
        if(res.data.chats.length!=0){
            const existing = JSON.parse(localStorage.getItem('last10')).length;
            const d=[]
            for(let i=1;i<existing;i++){
                d.push(JSON.parse(localStorage.getItem('last10'))[i])
            }
            // d.push(JSON.stringify(res.data.chats))
            const f = res.data.chats[0]
            d.push(f)
            localStorage.setItem('last10',JSON.stringify(d))
        }
    })

    let chatviewInner =``;
    let last10 = JSON.parse(localStorage.getItem('last10'));
    for(let i=0;i<last10.length;i++){
        chatviewInner+=`<li>`+ last10[i].userName + `:` + last10[i].chat +`</li>`;
    }
    document.getElementById('chat-div').innerHTML = chatviewInner
}



