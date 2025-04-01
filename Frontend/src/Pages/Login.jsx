import React, { useState } from 'react'
import axios from 'axios';

function Login() {
    const [formdata,setformdata] = useState({
        email:"",
        password:""
    });

    const handlesubmit = async (e) => {
        e.preventDefault();
        if(!formdata.email||!formdata.password){
            alert("All the fields are required!")
            return
        }
        try{
            await axios.post('http://localhost:3000/api/login',formdata);
            console.log("data sent successfully using axios for login!")
            setformdata({
            email:"",
            password:""
            })
        }
        
        catch(err){
            console.log("There was an error while sending login from frontend!", err);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full m-70 p-8 bg-[#94c864] shadow-lg rounded-xl">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>
            
            <form onSubmit={(e) => handlesubmit(e)} className="space-y-4">
              {/* Email Field */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-1">Email</label>
                <input
                  type="text"
                  value={formdata.email}
                  onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
                  className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
      
              {/* Password Field */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={formdata.password}
                  onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                  className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
      
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-75 transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default Login