import {useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignIn = async () => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username : username,
                password : password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            setUsername("");
            setPassword("");
        }
        catch(err){
            setUsername("");
            setPassword("");
            alert("Incorrect Credentials. Please try again.");
        }
    }

    return(
        <div className='max-w-md mx-auto border shadow-md mt-10 p-6 bg-white rounded-md'>
            <div className='mb-6 text-center'>
                <h2 className='m-1 font-bold text-3xl'>Sign In</h2>
                <h6 className='text-gray-500'>Enter your information to Signin to your account</h6>
            </div>
            <input 
                value={username}
                className='w-full border px-4 py-2 rounded-md shadow-sm mb-4'
                type='text'
                placeholder='Email/Username'
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                value={password}
                className='w-full border px-4 py-2 rounded-md shadow-sm mb-4'
                type='password'
                placeholder='Password'
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn} className='bg-gray-900 text-white rounded-md w-full mb-3 p-2'>Sign In!</button>
            <p className='text-center'>Already have an account? <Link to="/signup" className='underline'>Register</Link></p>
        </div>
    )
};