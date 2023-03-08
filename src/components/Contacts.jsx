import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.pic);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact
        )
    }
    return (
        <>
            {currentUserImage && currentUserName && (
                <Cont>
                    <div className="brand">
                        <img src={Logo} alt="" className="src" />
                        <h3>Friends Chat</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <>
                                    <div className={`contact ${index === currentSelected ? "selected" : ""
                                        }`} key={index}
                                        onClick={() => changeCurrentChat(index, contact)} >
                                        <img src={`${contact.pic}`} alt="Pic" />
                                    </div>
                                    <div className='username'>
                                        <h3>{contact.username}</h3>
                                    </div>

                                </>

                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="user-pic">
                            <img src={`${currentUserImage}`} alt="Pic" />
                        </div>
                        <div className='username'>
                            <h3>{currentUserName}</h3>
                        </div>
                    </div>
                </Cont>
            )
            }
        </>
    )
}

const Cont = styled.div`
 display: grid;
 grid-template-rows: 10% 75% 15%;
 overflow:hidden;
 background-color: #080420;
 .brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    img{
        height:2rem;
    }
    h3{
        color:white;
        text-transform:uppercase;
    }
 }
 .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width:0.1rem;
        }
    }
    .contact{
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap:1rem;
        align-item:center;
        display: flex;
        transition:0.5s ese-in-out;
        img{
            height:2.5rem;
            border-radius:50%;
            overflow:hidden:
            clip-path:circle();
        }
       
    }
    .username{
        h3{
            color:white;
            margin-top:-4rem;
            margin-left:-3rem;
        }
    }
    .selected{
        background-color:#9186f3;
    } 
    
 }
 .current-user{
    bacground-color:#0d0d30;
    display:flex;
    justify-content:center;
    align-center:center;
    gap:2rem;
    .user-pic{
        img{
            height:4.5rem;
            border-radius:50%;
            max-inline-size:100%;
            clip-path:circle();
        }
    }
    .username{
        h3{
            color:white;
            margin-top:1.5rem;
        }
    }
    @media screen and (min-width:720px) and (max-width:1080px){
        gap:0.5rem;
        .username{
            h3{
                font-size:1rem;
            }
        }
      } 
 }
`;