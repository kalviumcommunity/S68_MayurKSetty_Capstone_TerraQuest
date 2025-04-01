import React from 'react';

function Notification({ messages }) {
  return (
    <div className="absolute right-0 top-23 p-4 m-4 w-115 min-h-140 bg-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4">
      {messages && messages.length > 0 ? (
        messages.map((item, index) => (
          <div key={index}>
            <img src={item.profile} alt={item.name} />
            <h4>{item.messages}</h4>
          </div>
        ))
      ) : (
        <div className=' flex flex-col justify-center items-center h-full w-full'>
          <h4 className='text-gray-500'>No messages</h4>
        </div>
      )}
    </div>
  );
}

export default Notification;
