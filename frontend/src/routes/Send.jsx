import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export const Send = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const toId = searchParams.get("to");
    const toName = searchParams.get("name");
    const [amount, setAmount] = useState();

    const handleTransfer = async() => {
        try{
            await axios.post("http://localhost:3000/api/v1/account/transfer", 
                {"to" : toId, "amount" : parseInt(amount, 10)},
                {
                    "headers" : {
                        "authorization" : "Bearer " + localStorage.getItem("token")
                    }
                }    
            )
            navigate("/dashboard");
        }
        catch(err){
            alert("Please enter a valid amount.")
        }
    }

    return (
        <div className="mt-10 p-6 mx-auto max-w-md bg-white border shadow-md rounded-md">
            <div className="mb-6 text-center">
                <h2 className="m-1 text-2xl font-bold">Send Money to {toName}</h2>
                <h6 className="text-gray-500 ">Please enter the Amount</h6>
            </div>
            <input
                className="mb-4 px-4 py-2 w-full border rounded-md shadow-sm"
                value={amount}
                required
                type="text"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransfer} className="text-center bg-gray-900 text-white rounded-md w-full p-2">Send</button>
        </div>
    )
};