import axios from "axios";
import { useState, useEffect } from "react";
import { Filter } from "../Components/Filter";

export const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [balance, setBalance] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        "authorization": "Bearer " + token
                    }
                });
                setBalance(response.data.balance);
            } catch (err) {
                alert("Account doesn't exist.");
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchUsers() {
            try{
                const response = await axios.post(`http://localhost:3000/api/v1/user/bulk?filter=${search}`);
                setFilteredUsers(response.data.user);
            }
            catch(err){
                alert("Error in fetching Users");
            }
        }  

        fetchUsers();
    }, [search]);
    return (
        <div>
            <div className="w-full p-10 flex justify-between ">
                <h1 className="text-4xl font-bold">Payments App</h1>
                <div>
                    <h3>Hello, User</h3>
                </div>
            </div>
            <div className="p-8 ml-10 text-xl border rounded-lg shadow-md inline-block">
                <h3 className="text-center">Your Balance: {balance}</h3>
            </div>
            <div>
                <h1 className="ml-10 mt-10 mb-5 text-3xl font-bold ">Users</h1>
                <input
                    className="ml-10 mb-5 px-6 py-3 border rounded-md shadow-sm"
                    value={search}
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Filter filteredUsers = {filteredUsers}/>
        </div>
    );
};