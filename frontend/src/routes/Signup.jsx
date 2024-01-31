import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister () {
      try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
          firstName : firstName,
          lastName : lastName,
          username : username,
          password : password
        });
        
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard");
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
      }
      catch(err){
        alert("Incorrect Inputs. Please enter valid information.");
      }
    }
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border bg-white rounded-md shadow-md" >
        <div className="mb-6 text-center">
          <h2 className="m-1 text-3xl font-bold">Sign Up</h2>
          <h6 className="text-gray-500">Enter your information to create your account</h6>
        </div>
        <input
          className= "mb-4 px-4 py-2 border rounded-md w-full shadow-s"
          type="text"
          required
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className= "mb-4 px-4 py-2 border rounded-md w-full shadow-s"
          type="text"
          required
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className= "mb-4 px-4 py-2 border rounded-md w-full shadow-s"
          type="text"
          required
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className= "mb-4 px-4 py-2 border rounded-md w-full shadow-s"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister} className="mt-2 mb-3 bg-gray-900 text-white px-4 py-2 rounded-md w-full">
          Register!
        </button>
        <p className="text-center">Already have an account? <Link to="/signin" className="underline">Login</Link></p>
      </div>
    );
  };
  