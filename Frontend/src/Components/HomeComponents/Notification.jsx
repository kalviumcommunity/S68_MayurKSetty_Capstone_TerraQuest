import React, { useState } from "react";
import bell from "../../assets/icons/notification.png";
import { MdCancel } from "react-icons/md";

function Notification({ initialMessages }) {
  initialMessages = [
    {
      profile: "https://via.placeholder.com/400x250/ff0000/ffffff?text=Hello",
      name: "helloboy",
      message: "Added a new observation",
    },
    {
      profile: "https://via.placeholder.com/400x250/ff0000/ffffff?text=Hello",
      name: "monkey1234",
      message: "Added a new observation",
    },
    {
      profile: "https://via.placeholder.com/400x250/ff0000/ffffff?text=Hello",
      name: "ramyu",
      message: "Added a new observation",
    },
    {
      profile: "https://via.placeholder.com/400x250/ff0000/ffffff?text=Hello",
      name: "toddy",
      message: "Added a new observation",
    },
    {
      profile: "https://via.placeholder.com/400x250/ff0000/ffffff?text=Hello",
      name: "black bear",
      message: "Added a new observation",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  const removeMessage = (indexToRemove) => {
    setMessages(messages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="absolute right-0 top-23 p-4 m-4 w-115 min-h-140 bg-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4">
      <img
        src={bell}
        className={`${messages.length > 0 ? "visible" : "hidden"} absolute right-1 top-1 w-10`}
      />
      <div className="flex flex-col mt-15">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="flex flex-row w-full">
              <div className="flex felx-row bg-white gap-4 m-1.5 pr-10 p-4 rounded-2xl">
                <img
                  src={msg.profile}
                  class
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col">
                  <p className="text-xs">{msg.name}</p>
                  <h4 className="text-xl">{msg.message}</h4>
                </div>
              </div>
              <button
                onClick={() => {
                  removeMessage(index);
                }}
              >
                <MdCancel className="text-red-600" />
              </button>
            </div>
          ))
        ) : (
          <div className=" flex flex-col justify-center items-center h-full w-full">
            <h4 className="text-gray-500">No messages</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
