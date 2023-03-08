import React, { useEffect,useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import {io} from 'socket.io-client';
import { allUserRoute,host } from '../utils/AllRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts,setContacts]= useState([]);
  const [currentUser,setCurrentUser] = useState([]);
  const [currentChat,setCurrentChat] = useState(undefined)
  useEffect(()=>{
   async function getCurrentUser(){
    if (!localStorage.getItem("chat-app-user")) {
      navigate('/login');
  } else{
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
  }
   }
   getCurrentUser() 
  },[])
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])
  useEffect(()=>{
    async function fetchData(){
      try{
        if(currentUser){
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        }else{
          console.log("Problem")
        }
      }
       catch(err){
        console.log(err)
       }
    }
    fetchData()
  },[currentUser])

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }
  return (
    <>
      <Container>
        <div className="container">
         <Contacts 
         contacts={contacts} 
         currentUser={currentUser} 
         changeChat={handleChatChange}/>
         {
          currentChat === undefined ?
          <Welcome currentUser={currentUser}/> :
          <ChatContainer socket={socket} currentChat={currentChat} currentUser={currentUser}/>
         }
        
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
 height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 justify-content: center;
 gap: 1rem;
 align-items: center;
 background-color: #131324;
 .container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;

  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns: 35% 65%;
  }
 }
`;
export default Chat