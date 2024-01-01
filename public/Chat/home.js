const notification = document.getElementById('notification-div');
const usersDetailes = document.getElementById('users-detailes-div');
const chatView = document.getElementById('chat-div');
const chatBox = document.getElementById('chat');
const createGroup = document.getElementById('create-group');
const sendgrouoMessage = document.getElementById('send-group-message');
const commonGroupButton = document.getElementById('common-group-button'); 

const baseURL = `http://localhost:3001`;
const socket = io('http://localhost:3000');
let clickedCommonGroupButton = false;
const editButton = document.getElementById('edit');

// const socket = io(window.location.origin);

socket.on("connect",()=>{
    socket.on('common-chat', () => {
        showOnscreenChats()
    })

    socket.on('group-message', (groupId) => {
            startgroupchatContent(groupId)
        })
})


createGroup.addEventListener('click',()=>{
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/home/group/create`,{headers: {"Authentication":token}})
    .then((res)=>{
        let groupCreationPopupinner = ``;
        groupCreationPopupinner+=`<input type="text" id="group-name"  placeholder="Eg:Friends Group"><br>`
        for(let i=0;i<res.data.users.length;i++){
            groupCreationPopupinner+=`${res.data.users[i].userName}<input id="checkbox" type="checkbox" name="user" value=${res.data.users[i].userId}><br>`
        }
        groupCreationPopupinner+=`<div class="overlay-button-maincontainer">` + `<div class="overlay-button-container">` + `<button>` + `<a id="closebutton" type="submit" href="#">Close` + `</a>` + `</button>` +
        `<button>` + `<a id="createbutton" type="submit" onclick="createfunction()" href="#">Create</a>`+ `</button>` + `</div>` + `</div>`
        document.getElementById('group-creation-popup').innerHTML = groupCreationPopupinner;
    })
})


function createfunction(){
    const token = localStorage.getItem("token");
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
        showOnscreenGroups(res.data.groups);
    })
}


// Function to get chat history
function getCommonGroupChats() {
    if(!clickedCommonGroupButton){
        return
    }
    const token = localStorage.getItem('token');

    axios.get(`${baseURL}/home/lastchats`).then(res=>{
        localStorage.setItem("last10",JSON.stringify(res.data.chats))
    })

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
            document.getElementById('group-joined-names').innerHTML = loginDetailes;
        } 
        showOnscreenChats()
    })
    .catch((err)=>{
        console.log("tutu")
    }) 
}

// Function to get common group chat section

function getCommonGroupChatBody () {
    let chatBody = `<div class="chat-container" id="group-chat-box-main-container">` +
                    `<div class="chat-container-header">`+
                        `<div id="group-chat-title" class="chat-title-section"></div>`+
                    `</div>`+
                    `<div class="chat-body">` +
                        `<div id="group-chat-edit"></div>`+
                        `<div class="chat-names-container">`+
                            `<div class="joined-names" >`+
                                `<div class="joined-names-subsection" id="group-joined-names"></div>`+
                            `</div>`+
                            `<div id="group-chat-message" class="message-container"></div>`+
                        `</div>`+
                    `</div>` +
                    `<div class="common-chat-typing-container">`+                            
                            `<div id="common-group-chat-box" class="group-chat-box">`+

                            `</div>`+
                            `<div class="form-popup" id="myForm">` +
                                `<div id="image-popup" action="/action_page.php" class="form-container">`+
                                  
                                  
                                `</div>`+
                            `</div>` +
                        `</div>` +
                `</div>`

                document.getElementById('group-chat-box-main-container').innerHTML = chatBody;
                let groupChatBox=`<input type="text" required class="chat-input-field" id="group-chat" >`+
    `<button type="submit" id="common-send-group-message" class="chat-send-button" onclick="sendButton()">SEND</button>` +
    `</input>`
    document.getElementById('common-group-chat-box').innerHTML = groupChatBox;
}



commonGroupButton.addEventListener('click',(e)=>{
    clickedCommonGroupButton = true;
    getCommonGroupChats();
    getCommonGroupChatBody();
})

window.addEventListener('DOMContentLoaded',()=>{
    console.log('DOM loaded')
    clickedCommonGroupButton = true;
    getCommonGroupChats();
    getCommonGroupChatBody();

    const token = localStorage.getItem('token');

    axios.get(`${baseURL}/home/lastchats`).then(res=>{
        localStorage.setItem("last10",JSON.stringify(res.data.chats))
    })

    axios.get(`${baseURL}/home/chatusers`,{headers: {"Authentication": token}})
    .then((res)=>{
        showOnscreenChats()
        showOnscreenGroups(res.data.groups)
    })
    .catch((err)=>{
        console.log("tutu")
    }) 
})

// Function to get chat section of all the groups except common group

function getChatBody () {
    let chatBody = `<div class="chat-container" id="group-chat-box-main-container">` +
                    `<div class="chat-container-header">`+
                        `<div id="group-chat-title" class="chat-title-section"></div>`+
                    `</div>`+
                    `<div class="chat-body">` +
                        `<div id="group-chat-edit"></div>`+
                        `<div class="chat-names-container">`+
                            `<div class="joined-names" >`+
                                `<div class="joined-names-subsection" id="group-joined-names"></div>`+
                            `</div>`+
                            `<div id="group-chat-message" class="message-container"></div>`+
                        `</div>`+
                    `</div>` +
                    `<div class="common-chat-typing-container">`+
                            // `<div id="group-chat-box-image" class="group-chat-box-image" ></div>`+
                            
                            `<div id="group-chat-box" class="group-chat-box">`+

                            `</div>`+
                            `<div class="form-popup" id="myForm">` +
                                `<div id="image-popup" action="/action_page.php" class="form-container">`+
                                  
                                  
                                `</div>`+
                            `</div>` +
                        `</div>` +
                `</div>`

    document.getElementById('group-chat-box-main-container').innerHTML = chatBody;
}

function sendButton(){
    // e.preventDefault();
    console.log(document.getElementById('group-chat'))
    const chatData = {
        chat:document.getElementById('group-chat').value,
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
        const newChatData = res.data.chat;
        newLocalStorage.push(newChatData)
        localStorage.setItem('last10',JSON.stringify(newLocalStorage))
        showOnscreenChats()
        socket.emit('common-chat-send')
    })

    // const token = localStorage.getItem('token');
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
    
}


function showOnscreenGroups(data){
    console.log('==============showOnscreenGroups')
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
        groupsNameInner+=`<li id="${data[i].groupId}" onclick = "getChatBody();startgroupchat(${data[i].groupId});startgroupchatContent(${data[i].groupId})">`+ data[i].groupName +`</li>`
    }
    document.getElementById('groups-name').innerHTML = groupsNameInner;    
}


function showOnscreenChats(){
    let chatviewInner =``;
    let last10 = JSON.parse(localStorage.getItem('last10'));
    const userName = localStorage.getItem('userName');
    for(let i=0;i<last10.length;i++){
        const dateString = last10[i].createdAt;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
            hour12: true,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        const dateOnly = formattedDate.substring(0, 10); 
        const timeOnly = formattedDate.substring(11);

        if(last10[i].userName === userName) {
            chatviewInner+=`<li class="chat-content">` + `<div class="owner-chat-text">` + `<div>` + `</div>` + `<div>` + `<span>` + `<div class="chat-section-container">` + `<div class="chat-name-section">` + `</div>` + `<div class="chat-date-scection">` + dateOnly + `</div>` + `</div>` + `<div class="chat-content-field">` + `<div>` + last10[i].chat + `</div>` + `<div class="chat-time">` + timeOnly + `</div>` + `</div>` + `</span>` + `</div>` + `</ li>`
        } else {
            chatviewInner+=`<li class="chat-content">`+ `<div class="chat-text">` + `<div>` + `<span>` + `<div class="chat-section-container">` + `<div class="chat-name-section">` + last10[i].userName + `</div>` + `<div class="chat-date-scection">` + dateOnly + `</div>` + `</div>` + `<div class="chat-content-field">` + `<div>` + last10[i].chat + `</div>` + `<div class="chat-time">` + timeOnly + `</div>` + `</div>` + `</span>` + `</div>` + `<div>` + `</ li>`
        }
    }
    document.getElementById('group-chat-message').innerHTML = chatviewInner;
    const messageInputField = document.getElementById('group-chat');
    messageInputField.value = '';
}

function openForm(groupId) {
    document.getElementById("myForm").style.display = "block";
        let groupChatBox = ``;
        groupChatBox+=`<input class="choose-file-input" type="file" accept="image/*" id="group-chat-image">`+
        `<div class="image-send-buttons">` +
        `<div class="image-send-buttons-subsection">` +
        `<button class="btn-send" type="submit" id="send-group-message" onclick = "sendmessageAsImage(${groupId})">SEND</button>` +
        `<button type="button" class="btn cancel" onclick="closeForm()">Close</button>` +
        `</div>` +
        `</div>` +
        `</input>`
    document.getElementById('image-popup').innerHTML = groupChatBox;
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function startgroupchat(groupId){
    let groupChatBoxImage =``;
    let groupChatBox = ``;
    clickedCommonGroupButton = false;
    document.getElementById('group-joined-names').innerHTML = `<div></div>`;

    groupChatBox+=`<input type="text" required class="chat-input-field" id="group-chat" >`+
    `<button type="submit" id="send-group-message" class="chat-send-button" onclick = "sendmessage(${groupId},${false})">SEND</button>` +
    `<button class="image-send-button" class="open-button" onclick="openForm(${groupId})">Image</button>` + `</input>`
    document.getElementById('group-chat-box').innerHTML = groupChatBox;
}

function startgroupchatContent(groupId){
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    console.log(userName)
    const messages = axios.get(`${baseURL}/home/group/getmessage?groupId=${groupId}`,{headers: {"Authentication": token}})
    .then((res)=>{
        let groupChatcontent = ``;
        for(let i=0;i<res.data.content.length;i++){
            
            const dateString = res.data.content[i].createdAt;
            const date = new Date(dateString);
            const formattedDate = date.toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
                hour12: true,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });

            const dateOnly = formattedDate.substring(0, 10); 
            const timeOnly = formattedDate.substring(11);
        
            if(res.data.content[i].userName === userName) {
                if(res.data.content[i].chatcontent.includes('eu-north-1.amazonaws.com')===true){
                    const url = JSON.stringify(res.data.content[i].chatcontent);
                    groupChatcontent+=`<li class="chat-content">` + `<div class="owner-chat-text">` + `<div>` + `</div>` + `<div>` + `<span>` + `<div class="chat-section-container">` + `<div class="chat-name-section">` + `</div>` + `<div class="chat-date-scection">` + dateOnly + `</div>` + `</div>` + `<div class="chat-content-field">` + `<div>` + `<img src = ${url} alt="image">` + `</div>` + `<div class="chat-time">` + timeOnly + `</div>` + `</div>` + `</span>` + `</div>` + `</ li>`
                }else{
                    groupChatcontent+=`<li class="chat-content">` + `<div class="owner-chat-text">` + `<div>` + `</div>` + `<div>` + `<span>` + `<div class="chat-section-container">` + `<div class="chat-name-section">` + `</div>` + `<div class="chat-date-scection">` + dateOnly + `</div>` + `</div>` + `<div class="chat-content-field">` + `<div>` + res.data.content[i].chatcontent + `</div>` + `<div class="chat-time">` + timeOnly + `</div>` + `</div>` + `</span>` + `</div>` + `</ li>`
                }
               

            } else {
                if(res.data.content[i].chatcontent.includes('eu-north-1.amazonaws.com')===true){
                    const url = JSON.stringify(res.data.content[i].chatcontent);
                    groupChatcontent+=`<li class="chat-content">`+ `<div class="chat-text">` + `<div>` + `<span>` + `<div class="chat-section-container">` + `<div class="chat-name-section">` + res.data.content[i].userName + `</div>` + `<div class="chat-date-scection">` + dateOnly + `</div>` + `</div>` + `<div class="chat-content-field">` + `<div>` + `<img src = ${url} alt="image">`+ `</div>` + `<div class="chat-time">` + timeOnly + `</div>` + `</div>` + `</span>` + `</div>` + `<div>` + `</ li>`
                }else{
                    groupChatcontent+=`<li class="chat-content">`+ `<div class="chat-text">` + `<div>` + `<span>` + `<div class="chat-section-container">` + `<div class="chat-name-section">` + res.data.content[i].userName + `</div>` + `<div class="chat-date-scection">` + dateOnly + `</div>` + `</div>` + `<div class="chat-content-field">` + `<div>` + res.data.content[i].chatcontent + `</div>` + `<div class="chat-time">` + timeOnly + `</div>` + `</div>` + `</span>` + `</div>` + `<div>` + `</ li>`
                }                
            }
        }
        document.getElementById('group-chat-message').innerHTML = groupChatcontent;
        let groupChatTitle = ``;
        groupChatTitle+=`<div class="chat-title">`+ `<div>`+ res.data.groupName +`</div>`+ `<div>` + res.data.groupMembersLength + `Members` + `</div>` +`</div>`+ `<div class="edit-button">` + `<button class="edit-groups">` + `<a class="edit-button-section" type="submit" id="edit" onclick ="editGroupContent(${groupId})" href="#popup2">Edit</a>` + `</button>` + `</div>`;
        document.getElementById('group-chat-title').innerHTML = groupChatTitle;        
    })



    // <div class="create-group-container" id="group-creation" >
    //                         <button class="create-groups">
    //                             <a class="create-group-button" id="create-group" href="#popup1" >New group</a>
    //                         </button>
    //                     </div>
    closeEditfunction()    
}

async function editGroupContent(groupId){
    const token = localStorage.getItem('token');
    await axios.get(`${baseURL}/home/group/information?groupId=${groupId}`,{headers: {"Authentication":token}})
    .then(async(response)=>{
        const groupName = JSON.stringify(response.data.groupName);
        await axios.get(`${baseURL}/home/group/create`,{headers: {"Authentication":token}})
        .then((res)=>{
            let groupEditPopupinner = ``;
            groupEditPopupinner+=`<input type="text" id="group-name" value=${groupName} onchange="groupnamefunction()"><br>`
            for(let i=0;i<res.data.users.length;i++){
                if(response.data.groupMembers.includes(res.data.users[i].userId)){
                    groupEditPopupinner+=`${res.data.users[i].userName}<input id="checkbox" type="checkbox" checked name="user" value=${res.data.users[i].userId}><br>`
                }else{
                    groupEditPopupinner+=`${res.data.users[i].userName}<input id="checkbox" type="checkbox" name="user" value=${res.data.users[i].userId}><br>`
                }
            }
            groupEditPopupinner+=`<div class="overlay-button-maincontainer">` + `<div class="overlay-button-container">` + `<button>` + `<a href="#" id="closebutton" type="submit" onclick="closeEditfunction()">Close</a>` + `</button>` +
            `<button>` + `<a href="#" id="createbutton" type="submit" onclick="updateFunction(${groupId},'${res.data.users.length}')">Update</button>` + `</button>` + `</div>` + `</div>`
    
            document.getElementById('group-edit-popup').innerHTML = groupEditPopupinner;
            
        })    
    })
}

if(editButton) {
    edit.addEventListener('click',(e)=>{  
        console.log('event')  
        editGroupContent();
    })
}   

function sendmessage(groupId){
    const groupChatContent = document.getElementById('group-chat').value;
    if(document.getElementById('group-chat').value === ""){
        alert("Please Enter some message");
    }else{
        const token = localStorage.getItem('token');
        axios.post(`${baseURL}/home/group/sendmessage`,{groupId: groupId,content: groupChatContent},{headers: {"Authentication": token}})
        .then((res)=>{
            startgroupchatContent(res.data.groupId)
            const groupChatContent = document.getElementById('group-chat').value = ""
            socket.emit('group-chat-send',groupId)
        })
    }
   
}

async function sendmessageAsImage(groupId){
    const token = localStorage.getItem('token');
    const file = document.getElementById('group-chat-image').files[0];
    const formData = new FormData();
    formData.append('image',file);
    formData.append('groupId',groupId)
    console.log(formData)
    await axios.post(`${baseURL}/home/group/sendimage`,formData ,{headers: {"Authentication": token}})
    .then((res)=>startgroupchatContent(groupId))
    socket.emit('group-chat-send',groupId)
}

async function editGroup(groupId){
    // const token = localStorage.getItem('token');
    // await axios.get(`${baseURL}/home/group/information?groupId=${groupId}`,{headers: {"Authentication":token}})
    // .then(async(response)=>{
    //     const groupName = JSON.stringify(response.data.groupName);
    //     await axios.get(`${baseURL}/home/group/create`,{headers: {"Authentication":token}})
    //     .then((res)=>{
    //         let groupEditPopupinner = ``;
    //         groupEditPopupinner+=`<input type="text" id="group-name" value=${groupName} onchange="groupnamefunction()"><br>`
    //         for(let i=0;i<res.data.users.length;i++){
    //             if(response.data.groupMembers.includes(res.data.users[i].userId)){
    //                 groupEditPopupinner+=`${res.data.users[i].userName}<input id="checkbox" type="checkbox" checked name="user" value=${res.data.users[i].userId}><br>`
    //             }else{
    //                 groupEditPopupinner+=`${res.data.users[i].userName}<input id="checkbox" type="checkbox" name="user" value=${res.data.users[i].userId}><br>`
    //             }
    //         }
    //         groupEditPopupinner+=`<button id="closebutton" type="submit" onclick="closeEditfunction()">Close</button>`
    //         document.getElementById('group-chat-edit').innerHTML = groupEditPopupinner;
    //         const groupnameValue = document.getElementById('group-name').value;
    //         groupEditPopupinner+=`<button id="createbutton" type="submit" onclick="updateFunction(${groupId},'${res.data.users.length}')">Update</button>`
    //         document.getElementById('group-chat-edit').innerHTML = groupEditPopupinner;
            
    //     })    
    // })
}

function closeEditfunction(){
    let groupEditPopupinner = ``;
    document.getElementById('group-chat-edit').innerHTML = groupEditPopupinner;
}

function updateFunction(groupId,length){
    const token = localStorage.getItem('token');
    const groupname = groupnamefunction()
    const checkedUsers = checkedUser(length);
    const uncheckedUsers = uncheckedUser(length);
    axios.post(`${baseURL}/home/group/edit`,{groupId:groupId,groupname:groupname,checkedUsers:checkedUsers,unchecked: uncheckedUsers},{headers: {"Authentication":token}})
    .then((res)=>{
        closeEditfunction()
        startgroupchatContent(groupId)
        alert(res.data.message)
    })
}

function groupnamefunction(){
    const groupnameValue = document.getElementById('group-name').value;
    return(groupnameValue)
}


function checkedUser(length){
    const checkBox = document.getElementsByName('user');
    const checked = [];
    for(i=0;i<length;i++){
        if(checkBox[i].checked){
            checked.push(checkBox[i].value)
        }
    }
    return(checked)
}
function uncheckedUser(length){
    const checkBox = document.getElementsByName('user');
    const unchecked = [];
    for(i=0;i<length;i++){
        if(!checkBox[i].checked){
            unchecked.push(checkBox[i].value)
        }
    }
    return(unchecked)
}

