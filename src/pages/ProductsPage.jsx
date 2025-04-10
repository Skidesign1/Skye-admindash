import { motion } from "framer-motion";
import {useState} from "react"
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

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
					<div className="bg-[#1E1E1E] rounded-lg shadow-lg max-w-sm w-full p-6">
						<div className="flex justify-end gap-2">
							<button
								onClick={() => setIsOpen(false)}
								className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
							>
								Close
							</button>
			
						</div>
						<form onSubmit={handleCreateCreative} className='flex flex-col text-white text-left'>

							<h1 style={{fontSize: '17px'}}>Create Creative</h1>

							<label style={{ fontSize: '14px' }}>Name</label>
							<input
								style={{ fontSize: '14px', color: 'black' }}
								name="creativeName"
								type="text"
								placeholder="Name"
								value={creativeName} // Bind input to state
								onChange={(e) => setCreativeName(e.target.value)}
								required
							/>

							<label style={{ fontSize: '14px' }}>Email</label>
							<input
								style={{ fontSize: '14px', color: 'black' }}
								name="creativeEmail"
								type="email"
								placeholder="Email"
								value={creativeEmail}
								onChange={(e) => setCreativeEmail(e.target.value)}
								required
							/>

							<label style={{ fontSize: '14px' }}>Skills</label>
							<input 
								style={{fontSize: '14px', color: 'black'}} 
								name="skills" 
								type="text" 
								placeholder="skills (comma-separated)" 
								onChange={(e) => setSkills(e.target.value)}
							/>

							<button
								style={{ fontSize: '14px' }}
								className='bg-white mt-4 text-black'
								type='submit'
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
