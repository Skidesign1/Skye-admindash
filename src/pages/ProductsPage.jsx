import { motion } from "framer-motion";
import {useState} from "react"
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { FiX } from "react-icons/fi";


import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
	const [isOpen, setIsOpen] = useState(false);
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [clients, setClients] = useState([]);
    const [creativeName, setCreativeName] = useState('');
    const [creativeEmail, setCreativeEmail] = useState('');
    const [skills, setSkills] = useState('');
    // const [password, setPassword] = useState('');
    // const [capabilities, setCapabilities] = useState('');

	const handleCreateCreative = async (e) => {
        e.preventDefault();
    
        // Convert skills string into an array
        const skillsArray = skills.split(",").map(skill => skill.trim());
    
        console.log("Submitting:", { 
            creativeName, 
            creativeEmail, 
            skills: skillsArray // Log this to confirm it's an array
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/admin/create-creative', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creativeName, creativeEmail, skills: skillsArray }), // Send as array
            });
    
            const data = await response.json();
            console.log("New Creative Created:", data);
    
        } catch (error) {
            console.error("Error:", error.message);
        }
    };


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Creative' />
			<div className='flex px-8 justify-end'>
				<button
					onClick={() => setIsOpen(true)}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Create Creative
				</button>

				{/* <button className="bg-red-700 p-2"></button> */}
			</div>

			{isOpen && (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-[#1E1E1E] rounded-lg shadow-lg max-w-sm w-full p-6 text-white">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">Create Creative</h2>
					<button
					onClick={() => setIsOpen(false)}
					className="text-white hover:text-gray-400"
					>
					<FiX size={20} />
					</button>
				</div>

				<form onSubmit={handleCreateCreative} className="flex flex-col text-left space-y-3 text-sm">
					<div>
					<label className="block mb-1">Name</label>
					<input
						name="creativeName"
						type="text"
						placeholder="Name"
						className="w-full px-3 py-2 text-black rounded"
						value={creativeName}
						onChange={(e) => setCreativeName(e.target.value)}
						required
					/>
					</div>

					<div>
					<label className="block mb-1">Email</label>
					<input
						name="creativeEmail"
						type="email"
						placeholder="Email"
						className="w-full px-3 py-2 text-black rounded"
						value={creativeEmail}
						onChange={(e) => setCreativeEmail(e.target.value)}
						required
					/>
					</div>

					<div>
					<label className="block mb-1">Skills</label>
					<input
						name="skills"
						type="text"
						placeholder="Skills (comma-separated)"
						className="w-full px-3 py-2 text-black rounded"
						onChange={(e) => setSkills(e.target.value)}
					/>
					</div>

					<button
					type="submit"
					className="bg-white text-black py-2 rounded hover:bg-gray-200"
					>
					Create
					</button>
				</form>
				</div>
			</div>
			)}

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={1234} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				{/*<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>*/}
			</main>
		</div>
	);
};
export default ProductsPage;
