import React, { useState } from 'react'
import axios from 'axios';

function Login() {
    const [formdata,setformdata] = useState({
        email:"",
        password:""
    });

    const handlesubmit = async (e) => {
        e.preventdefault();
        if(!formdata.email||!formdata.password){
            alert("All the fields are required!")
            return
        }
        try{
            await axios.post('http://localhost:3000/api/login',formdata);
            console.log("data sent successfully using axios for login!")
        }
        
        catch(err){
            console.log("There was an error while sending login from frontend!", err);
        }
    }


  return (
    <>
        <div>
            <h1>Login</h1>
            <form onSubmit={(e)=>handlesubmit(e)}>
                <div>
                    <label>Email</label>
                    <input type="text" value={formdata.email} onChange={(e)=> setformdata({...formdata,email:e.target.value})} />
                </div>
                
                <div>
                    <label>Password</label>
                    <input type="password" value={formdata.password} onChange={(e)=>setformdata({...formdata,password:e.target.value})} />
                </div>

                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>    
    </>
  )
}

export default Login