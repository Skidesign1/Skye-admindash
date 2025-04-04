import { useState } from "react";

const ClientBlockToggle = ({ clientId, isBlockedInitially = false }) => {
    const [isBlocked, setIsBlocked] = useState(isBlockedInitially); // ✅ Use default value if undefined

    const handleToggleBlock = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/block-client/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${localStorage.getItem("token")}`, 
                },
                body: JSON.stringify({ isBlocked: !isBlocked }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Failed to update client status.");
            }
    
            console.log("Success:", data);
            setIsBlocked(!isBlocked); // Update UI state
        } catch (error) {
            console.error("Error updating block status:", error);
        }
    };

    return (
        <div className="flex items-center">
            <h3 style={{ fontSize: "14px" }}>Block</h3>
            <input 
                type="checkbox" 
                checked={isBlocked} 
                onChange={handleToggleBlock} 
                className="ml-2"
            />
        </div>
    );
};

export default ClientBlockToggle;
