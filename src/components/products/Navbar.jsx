import React, { useState } from "react";
import CreativeModal from "./CreativeModal";

const Navbar = ({ onAddCreative }) =>  {
    const [showModal, setShowModal] = useState(false);
    const [isClicked, setIsClicked] =useState(false);

    const handleClick = () => {
        setShowModal(true);
        setIsClicked(true);
    };
 return (
    <nav className="bg-black shadow-md p-4 flex justify-between items-center">
    <button
    onClick={handleClick}
    className="absolute right-6 bg-gray-900 text-red px-4 py-2 rounded-full  transition bg-red-500 hover:bg-red-600 text-white"
    >
        Add Creative
    </button>
    <CreativeModal show={showModal} onClose={() => setShowModal(false)}/>
</nav>

 );
};
export default Navbar;