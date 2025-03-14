import React from 'react'
import axios from 'axios';
import { useState } from 'react';

function Signup() {

  const [formdata,setformdata] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
});

const handlesubmit = async (e) => {
   e.preventDefault();
    if(!formdata.name || !formdata.email||!formdata.password ||!formdata.confirmPassword){
        alert("All the fields are required!")
        return
    }
    if(formdata.password === formdata.confirmPassword){
        const tosend = {
            name:formdata.name,
            email:formdata.email,
            password:formdata.password
        }
    try{
        await axios.post('http://localhost:3000/api/signup',tosend);
        console.log("data sent successfully using axios for login!")
        setformdata({
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        });
    }
    
    catch(err){
        console.log("There was an error while sending signup from frontend!", err);
    }
  }
  else{
    return console.log("The passwords don't match")
  }
}

  return (
    <>
        <div>
            <h1>Signup</h1>
            <form onSubmit={(e)=>handlesubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type="text" value={formdata.name} onChange={(e)=> setformdata({...formdata,name:e.target.value})} />
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" value={formdata.email} onChange={(e)=> setformdata({...formdata,email:e.target.value})} />
                </div>
                
                <div>
                    <label>Password</label>
                    <input type="password" value={formdata.password} onChange={(e)=>setformdata({...formdata,password:e.target.value})} />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={formdata.confirmPassword} onChange={(e)=>setformdata({...formdata,confirmPassword:e.target.value})} />
                </div>

                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>    
    </>
  )
}

export default Signup