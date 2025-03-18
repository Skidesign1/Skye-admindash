import React from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const navigate =useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    }; 
   
    return(
        <div className="flex items-center justify-center h-screen w-full px-4 sm:px-6 lg:px-8 bg-black-100">
        <div className="flex justify-center items-center h-screen w-full bg-black-100">
            <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2x1 font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-grey-700">Email</label>
                        <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-black text-white placeholder-gray-400"
                       placeholder="Enter your email"
                        required
                        />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                password
                            </label>
                            <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg bg-black text-white focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                            required
                            />
                        </div>
                        {/*Forget password Link*/}
                        <div className="text-right mb-4">
                            <a href="/forget-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                            </a>
                        </div>
                        <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        
>                        Login
                        </button>
                </form>
            </div>
        </div>
        </div>
    );
};
export default LoginPage;