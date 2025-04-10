import { useState } from "react";

const CreativeBlockToggle = ({ creativeId, isBlockedInitially = false }) => {
    const [isBlocked, setIsBlocked] = useState(isBlockedInitially); // ✅ Use default value if undefined

    const handleToggleBlock = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/block-creative/${creativeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${localStorage.getItem("token")}`, 
                },
                body: JSON.stringify({ isBlocked: !isBlocked }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Failed to update partner status.");
            }
    
            console.log("Success:", data);
            setIsBlocked(!isBlocked); // Update UI state
        } catch (error) {
            console.error("Error updating block status:", error);
        }
    };

    return (
        <div style={{fontSize: '14px'}} className="">
            <button
                onClick={handleToggleBlock}
                className={`px-2 py-1 rounded font-semibold transition-all ${
                isBlocked
                    ? " text-green-100 hover:bg-green-700"
                    : " text-red-100 hover:bg-red-700"
                }`}
            >
                {isBlocked ? "Unblock" : "Block"}
            </button>
        </div>
    );
};

export default CreativeBlockToggle;
