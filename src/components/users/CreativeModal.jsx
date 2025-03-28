import React from "react";
const CreativeModal = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white  p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-x1 font-bold mb-4">Create Account</h2>
                <form className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                    <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Country" className="w-full p-2 border rounded" />
                    <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                    <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded" />
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Signup
                    </button>
                </form>
                <button onClick={onClose} className="mt-3 text-red-500 hover:underline">
                    Close
                </button>
            </div>
        </div>
    );
};
export default CreativeModal;