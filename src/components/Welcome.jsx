import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
export default function Welcome({currentUser}) {
  return (
    <ContainerWelcome>
      <img src={Robot} alt="Robot"/>
      <h1>
        Welcome, <span>{currentUser.username}! </span>
      </h1>
      <h3>
        Please Select an chat to start messaging
      </h3>
    </ContainerWelcome>
  );
}
const ContainerWelcome = styled.div`
 display:flex;
 justify-content:center;
 align-items:center;
 flex-direction:column;
 color:white;
 img{
  height:20rem;
 }
 span{
  color:#4e00ff
 }
`;