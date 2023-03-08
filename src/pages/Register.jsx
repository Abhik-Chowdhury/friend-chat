import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import { registeRoute } from '../utils/AllRoutes';
function Register() {
    // Password Type and Icon 
    const [passwordType, setPasswordType] = useState("password");
    const [icon, setIcon] = useState("fa-regular fa-eye-slash");
    
    // The variables for data of an user
    const [username,setUserName]= useState();
    const [password,setPassword]= useState();
    const [confirmPassword,setConfirmPassword]= useState();
    const [email,setEmail]= useState()
    const [pic, setPic] = useState();
    const showHidePassword = () => {
        if (passwordType === "password") {
            setIcon("fa-regular fa-eye")
            setPasswordType("text")
        } else {
            setIcon("fa-regular fa-eye-slash")
            setPasswordType("password")
        }
    }
    
    
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", registeRoute)
            console.log(username,email,password,pic);
            const { data } = await axios.post(registeRoute, {
                username,
                email,
                password,
                pic,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOption)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                toast.success("User Created Sucessfully", toastOption);
                navigate("/");
            }
        }
    };
    const postProfile = (pics) => {
        if (pics === undefined) {
            toast.warning("Please Select an Image", toastOption);
            return;
        }
        console.log(pics);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chatapp");
            data.append("cloud_name", "dvfxrdr5m");
            fetch("https://api.cloudinary.com/v1_1/dvfxrdr5m/image/upload", {
                method: "post",
                body: data,
            })
            .then((res)=> res.json())
            .then((data)=>{
                setPic(data.url.toString())
                toast.success("Succesfully Uploaded",toastOption)
                console.log(data.url.toString())
            })
            .catch((err)=>{
                console.log(err)
            });
        } else{
            toast.warning("Please Select an Image");
            return;
        }
    }
    const handleValidation = () => {
        if (password !== confirmPassword) {
            toast.error("Password Not Matched",
                toastOption
            );
            return false;
        } else if (username.length < 3) {
            toast.error("User Name Should be more than 3",
                toastOption
            );
            return false;
        } else if (password.length < 8) {
            toast.error("Password Should be equale or greater than 8 characters",
                toastOption
            );
            return false;
        } else if (email === "") {
            toast.error("Email is require",
                toastOption
            );
            return false;
        }
        return true;
    }

    
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt='Logo' />
                        <h1>Friend-Chat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={(e) => setUserName(e.target.value)} />

                    <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)} />
                    <div className="profile">
                        <input
                            type='file'
                            className='file'
                            id='file'
                            name={pic}
                            onChange={(e)=>postProfile(e.target.files[0])}
                            />
                        <label htmlFor="file">
                            Upload Profile pic
                            <p className='file-name'></p>
                        </label>
                        <span><i className="fa-solid fa-cloud-arrow-up"></i></span>
                    </div>
                    <div className='wrapper'>
                        <input
                            type={passwordType}
                            placeholder='Password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)} />
                        <span onClick={showHidePassword}><i className={icon}></i></span>
                    </div>

                    <div className='wrapper'>
                        <input
                            type={passwordType}
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        <span onClick={showHidePassword}><i className={icon}></i></span>
                    </div>
                    <button type='submit'>Create User</button>
                    <span>
                        already have an account ? <Link to="/login">login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  font-size: 62.5%;
  display: flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:1.5rem;
    background-color: #00000076;
    border-radius:2rem;
    margin-top:2rem;
    margin-bottom:1.5rem;
    padding: 2rem 5rem;
    input{
        background-color:transparent;
        padding: 1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color:#997af0;
        color:white;
        padding: 1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color:white;
        text-transform: uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }

    .file{
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        position: absolute;
      }
      .profile label{
        display: block;
        position: relative;
        width: 20rem;
        height: 3rem;
        border-radius: 2.5rem;
        background: linear-gradient(40deg, #4e0eff, #997af0);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size:1rem;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s ease-out;
      }
      .profile span{
        position:relative;
        top:-2rem;
        right:-15rem;
        curson: pointer;
      }
      input[type=file]:hover + label,
      input[type=file]:focus + label{
        transform: scale(1.02);
      }
  }

`;

export default Register