
export const Filter = ({filteredUsers}) => {

    const handlePayment = () => {
        
    };

    return (
        <div>
            {filteredUsers.length > 0 ? (filteredUsers.map((user, index) => (
                <div key={index} className="ml-10 mr-10 mb-5 px-4 py-2 border rounded-md shadow-sm flex justify-between">
                    <h3 className="px-4 py-2">{user.firstName} {user.lastName} ({user.username}) </h3>
                    <button onClick={handlePayment} className="mr-10 px-4 py-2 bg-gray-900 text-white rounded-md ">Send Money to {user.firstName}</button>
                </div>
            ))): (
            <p className="text-center text-xl font-bold">
                No such User exists.
            </p>
            )}
        </div>
    );
}