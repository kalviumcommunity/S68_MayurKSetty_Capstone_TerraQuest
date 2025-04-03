import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Profile() {
//     const[userdata,setUserData] = useState({});

    // useEffect(()=>{
    //     axios.get("http://localhost:3000/api/")
    // })
  return (
    <>
        <div className='flex flex-col items-center m-8'>
            <div>
                <img src="" alt="" className='border-4 w-40 h-40 rounded-full' />
            </div>
            <div className='flex flex-col mt-20 gap-4'>
                <div className='flex flex-row gap-2'>
                    <div className='border-2 bg-gray-100 w-3xl items-center flex flex-col'>
                        <p>{'Name'}</p>
                    </div>
                    <button className='border-2 w-20'>Edit</button>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='border-2 bg-gray-100 w-3xl items-center flex flex-col'>
                        <p>{'Email'}</p>
                    </div>
                    <button className='border-2 w-20'>Edit</button>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='border-2 bg-gray-100 w-3xl items-center flex flex-col'>
                        <p>{'Password'}</p>
                    </div>
                    <button className='border-2 w-20'>Edit</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile