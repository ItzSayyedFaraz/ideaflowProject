import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useIdea } from '../context/context';
import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'firebase/auth';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { app } from '../firebase/firebase';


const auth=getAuth(app)
const NavbarMenu = () => {
  const [tab,setTab]=useState(null)
  const navigate=useNavigate()
  const logUser=useIdea()

  
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if (user) {
        logUser.setUser(user)
    } else{
      console.log('you are logged in');
      logUser.setUser(null)
    }
  })
   },[])
 
  const gotoHome=()=>{
    
    document.getElementById('signin').style.backgroundColor="black"
    document.getElementById('home').style.backgroundColor="green"
    document.getElementById('signup').style.backgroundColor="black"
    document.getElementById('addidea').style.backgroundColor="black"    
    navigate('/')
    
  
  }
  const gotoSignin=()=>{
    if(logUser.user){
      // document.getElementById('signin').style.backgroundColor="Red"
      signOut(auth)
      navigate('/')
    }else{
    document.getElementById('signin').style.backgroundColor="green"
    document.getElementById('home').style.backgroundColor="black"
    document.getElementById('signup').style.backgroundColor="black"
    document.getElementById('addidea').style.backgroundColor="black"
   
    

    navigate('/signin')
    }
  }
  const gotoSignup=()=>{
    if(logUser.user){
      document.getElementById('signin').style.backgroundColor="black"
      document.getElementById('home').style.backgroundColor="green"
      document.getElementById('signup').style.backgroundColor="black"
      document.getElementById('addidea').style.backgroundColor="black"
    }else{
    document.getElementById('signin').style.backgroundColor="black"
    document.getElementById('home').style.backgroundColor="black"
    document.getElementById('signup').style.backgroundColor="green"
    document.getElementById('addidea').style.backgroundColor="black"    
    navigate('/signup')
    }
  }
  
  const gotoAddidea=()=>{
    document.getElementById('signin').style.backgroundColor="black"
    document.getElementById('home').style.backgroundColor="black"
    document.getElementById('signup').style.backgroundColor="black"
    document.getElementById('addidea').style.backgroundColor="green"   
    navigate('/addidea')
  }
  return (
    
        <div className='navDivContainer'>
    
  <nav className='navContainer'>
    <h1 >This is an assesment for Ideaflow.io</h1>
    <div className='navSubContainer'>
        <h3 onClick={gotoHome} id="home">Home</h3>
        <h4 onClick={gotoSignin} id="signin">{logUser.user?"Logout":"Signin"}</h4>
        <h4 onClick={gotoSignup} id='signup'>SignUp</h4>
        <h3 onClick={gotoAddidea} id="addidea">Add Idea</h3>
        
    </div>
  </nav>
      
  </div>
    
  )
}

export default NavbarMenu
