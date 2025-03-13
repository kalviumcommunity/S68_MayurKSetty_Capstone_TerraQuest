import React from 'react'

function Signup() {

  const [formdata,setformdata] = useState({
    email:"",
    password:"",
    confirmPassword:""
});

const handlesubmit = async (e) => {
   e.preventDefault();
    if(!formdata.email||!formdata.password ||!formdata.confirmPassword){
        alert("All the fields are required!")
        return
    }
    if(formdata.password === formdata.confirmPassword){
    try{
        await axios.post('http://localhost:3000/api/login',formdata);
        console.log("data sent successfully using axios for login!")
    }
    
    catch(err){
        console.log("There was an error while sending login from frontend!", err);
    }
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

export default Signup