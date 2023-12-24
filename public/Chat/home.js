const notification = document.getElementById('notification-div');
const usersDetailes = document.getElementById('users-detailes-div');
const chatView = document.getElementById('chat-div');
const chatBox = document.getElementById('chat');
const sendButton = document.getElementById('send');
const createGroup = document.getElementById('create-group');

const baseURL = `http://localhost:3001`;


createGroup.addEventListener('click',()=>{
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/home/group/create`,{headers: {"Authentication":token}})
    .then((res)=>{
        let groupCreationPopupinner = ``;
        groupCreationPopupinner+=`<input type="text" id="group-name"  placeholder="Eg:Friends Group"><br>`
        for(let i=0;i<res.data.users.length;i++){
            groupCreationPopupinner+=`${res.data.users[i].userName}<input id="checkbox" type="checkbox" name="user" value=${res.data.users[i].userId}><br>`
        }
        groupCreationPopupinner+=`<button id="closebutton" type="submit" onclick="closefunction()">Close</button>`
        groupCreationPopupinner+=`<button id="createbutton" type="submit" onclick="createfunction()">Create</button>`
        document.getElementById('group-creation-popup').innerHTML = groupCreationPopupinner;
    })
})

function closefunction(){
    let groupCreationPopupinner = ``;
    document.getElementById('group-creation-popup').innerHTML = groupCreationPopupinner;
}

function createfunction(){
    const token = localStorage.getItem("token");
    // const checkBox = document.getElementById('checkbox');
    // checkBox.addEventListener("change",(e)=>{
    //     e.preventDefault();
    //     chatBox

    // })
    const groupName = document.getElementById('group-name').value;
    const usersName = document.getElementsByName('user');
    const checkedUser = [];
    for(let i=0;i<usersName.length;i++){
        if(usersName[i].checked){
            checkedUser.push(usersName[i].value)
        }
    }
    const groupData = {members:checkedUser,groupname:groupName}
    axios.post(`${baseURL}/home/group/create`,groupData,{
        headers: {"Authentication": token}
    })
    .then((res)=>{
        let groupCreationPopupinner = ``;
        document.getElementById('group-creation-popup').innerHTML = groupCreationPopupinner;
        showOnscreen(res.data.groups)
    })
    console.log("out")



}



window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');

    axios.get(`${baseURL}/home/lastchats`).then(res=>{
        localStorage.setItem("last10",JSON.stringify(res.data.chats))
    })

    // setInterval(myfunction,1000);
    // showOnscreen(res.data.groups)
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
        showOnscreen(res.data.groups)
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
        const existingLocalStorage = JSON.parse(localStorage.getItem('last10'))
        const newLocalStorage=[]
        for(let i=1;i<existingLocalStorage.length;i++){
            newLocalStorage.push(JSON.parse(localStorage.getItem('last10'))[i])
        }
        const newChatData = res.data.chat
        newLocalStorage.push(newChatData)
        localStorage.setItem('last10',JSON.stringify(newLocalStorage))
        showOnscreen()
    })

    // const token = localStorage.getItem('token');
    // const chatLength = JSON.parse(localStorage.getItem('last10')).length
    // const id =JSON.parse(localStorage.getItem('last10'))[chatLength-1].chatId;
    // axios.get(`${baseURL}/home/newchats?lastmessageid=${id}`,{headers: {"Authentication": token}})
    // .then((res)=>{
    //     console.log(res.data.chats.length)
    //     // console.log(JSON.parse(localStorage.getItem('last10')).length-res.data.chats.length);
    //     if(res.data.chats.length!=0){
    //         const existing = JSON.parse(localStorage.getItem('last10')).length;
    //         const d=[]
    //         for(let i=1;i<existing;i++){
    //             d.push(JSON.parse(localStorage.getItem('last10'))[i])
    //         }
    //         // d.push(JSON.stringify(res.data.chats))
    //         const f = res.data.chats[0]
    //         d.push(f)
    //         localStorage.setItem('last10',JSON.stringify(d))
            
    //     }
    // })
    
})


function showOnscreen(data){

    // const token = localStorage.getItem('token');
    // axios.get(`${baseURL}/home/chats`,{headers: {"Authentication":token}})
    // .then((res)=>{
    // let chatviewInner =``;
    // for(let i=0;i<res.data.chats.length;i++){
    //     chatviewInner+=`<li>`+ res.data.chats[i].userName + `:` + res.data.chats[i].chat +`</li>`;
    // }
    // document.getElementById('chat-div').innerHTML = chatviewInner;
    // })
    let groupsNameInner = ``;
    for(let i=0;i<data.length;i++){
        groupsNameInner+=`<li>`+ data[i] +`</li>`
    }
    document.getElementById('groups-name').innerHTML = groupsNameInner;
    

    let chatviewInner =``;
    let last10 = JSON.parse(localStorage.getItem('last10'));
    for(let i=0;i<last10.length;i++){
        chatviewInner+=`<li>`+ last10[i].userName + `:` + last10[i].chat +`</li>`;
    }
    document.getElementById('chat-div').innerHTML = chatviewInner
}



