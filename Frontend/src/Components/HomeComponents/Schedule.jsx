import React from 'react'

function Schedule() {
  return (
    <>
        <div className="p-4 m-4 w-5xl h-76 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center md:items-start gap-4">
            <h1 className="text-2xl font-bold">Schedule and event</h1>
            <div className='flex flex-row'>
            <div className='flex flex-col gap-4 m-4'>
                <form className='flex flex-col'>
                    <label >Name</label>
                    <input type="text" placeholder=' |Name' className='border-1 border-gray-500 rounded-xs bg-white' />

                    <label >Location</label>
                    <input type="text" placeholder=' |location' className='border-1 border-gray-500 rounded-xs bg-white' />
                </form>
            </div>
            
            <div className='gap-4 m-4'>
                <h3>add people</h3>
                <input type="text" className='border-1 border-gray-500 rounded-xs bg-white' placeholder=' eg. jhon ' />
            </div>
        </div>
        </div>
    </>
  )
}

export default Schedule