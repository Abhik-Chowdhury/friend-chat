import React,{useState} from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'
import '../css/emoji.css'
import {BsEmojiSmileFill} from 'react-icons/bs'
import EmojiPicker from 'emoji-picker-react'
export default function ChatInput({handleSendMsg}) {
    const [showPicker,setShowPicker] = useState(false);
    const [msg,setMsg] = useState("");
    const handleEmojiPicker = ()=>{
        setShowPicker(!showPicker);
    } 
    const hadleEmojiClick = (eve,emoji)=>{
        console.log(emoji)
        let message = msg;
        message += emoji.emoji;
        setMsg(message)
    }
    const sendChat = (even)=>{
        even.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('')
        }
    }
  return (
   <ContInput>
    <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker}/>
            {
                showPicker && <EmojiPicker onEmojiClick={hadleEmojiClick}/>
            }
        </div>
    </div>
    <form className='input-container' onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)} />
        <button className='submit'>
            <IoMdSend/>
        </button>
    </form>
   </ContInput>
  )
}

const ContInput = styled.div`
display:grid;
grid-template-columns:5% 95%;
align-items:center;
bacground-color:#080420;
padding:0 2rem;
padding-bottom:0.3rem;
.button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    .emoji{
        position:relative;
        svg{
            font-size:1.5rem;
            color:#ffff00c8;
            cursor:pointer;
        }
        .emoji-picker-react{
            position:absolute;
            top:-340px;
            box-shadow:0 5px 10px #9a86f3;
            background-color:#080420;
            border-color: #9a8padding: 0 15px;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;6f3;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color: #080420;
                width: 5px;
                color:white;
                &-thumb{
                    background-color: #9a86f3;
                }
            }
            .emoli-categories{
                button{
                    filter: contast(0);
                }
            }
            .emoji-search{
                background-color:transparent;
                border-color:#9186f3;
            }
            .emoji-group:before{
                background-color:#080420;
            }
        }
    }
}
.input-container{
    width:100%;
    border-radius:2rem;
    display:flex;
    align-items:center;
    gap:2rem;
    background-color:#ffffff34;
    input{
        width:90%;
        height:60%;
        background-color:transparent;
        color:white;
        border:none;
        padding-left:1rem;
        font-size:1.2rem;
        &::selection{
            background-color:#9186f3;
        }
        &:focus{
            outline:none;
        }
    }
    button{
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#9a86f3;
        border:none;
        svg{
            font-size:2rem;
            color:white;
        }
    }
}
`;