import React, { useState } from "react";
import background from "../assets/Backgrounds/Login-signup-bg.png";
import { useSelector } from "react-redux";
import axios from "axios";

function Contribute() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState(currentUser?.name || "");
  const [contact, setContact] = useState("");

  const predefinedAmounts = [100, 200, 500];

  const isValidPhone = (number) => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const handlePredefinedClick = (value) => {
    setAmount(value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!name || !amount || !contact) {
      return alert("Please fill in all required fields.");
    }
    if (!isValidPhone(contact)) {
      return alert("Please enter a valid Indian phone number.");
    }

    try {
      // 1. Create Razorpay order from backend
      const { data } = await axios.post("http://localhost:3000/payment/pay", {
        Contributer: name,
        Amount: amount,
        Contact: contact,
        Message: message,
      });

      // 2. Launch Razorpay checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Contribute",
        description: "Contribution Payment",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await axios.post(
            "http://localhost:3000/payment/verify",
            response,
          );

          // 3. Save contribution in DB
          await axios.post("/api/contribute", {
            Contributer: name,
            Amount: Number(amount),
            Message: message || "None",
          });

          alert("Payment successful! Thank you 🎉");

          // Clear form
          setAmount("");
          setMessage("");
          setContact("");
        },
        prefill: {
          name: name,
          contact: contact,
        },
        theme: {
          color: "#0f766e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the payment.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">
      {/* Background Pattern */}
      <div
        className="w-full h-full bg-contain bg-center p-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        <form
          onSubmit={handlePayment}
          className="max-w-md mx-auto bg-white bg-opacity-80 p-6 rounded"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Contribute</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              placeholder="Enter 10-digit mobile number"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Amount (INR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2 mt-2">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePredefinedClick(amt)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              className="w-full p-2 border rounded"
              placeholder="Write a message (optional)..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Contribute
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contribute;
