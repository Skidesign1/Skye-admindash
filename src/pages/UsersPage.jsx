import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import {useState} from "react"
import { FiX } from "react-icons/fi";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";

const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const UsersPage = () => {
	const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [clients, setClients] = useState([]);
    // const [creativeName, setCreativeName] = useState('');
    // const [creativeEmail, setCreativeEmail] = useState('');
    // const [skills, setSkills] = useState('');
    const [password, setPassword] = useState('');
    const [capabilities, setCapabilities] = useState('');

	const handleCreatePartner = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/create-partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, capabilities, password }),
            });
    
            // if (!response.ok) throw new Error("Failed to create partner");
    
            const data = await response.json();
            console.log("New Partner Created:", data);   
    
    
        } catch (error) {

            console.error("Error:", error.message);
        }
    };


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Partner' />
			<div className='flex px-8 justify-end'>
				<button
					onClick={() => setIsOpen(true)}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Create Partner
				</button>

				{/* <button className="bg-red-700 p-2"></button> */}
			</div>

			{isOpen && (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 text-white">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">Create Partner</h2>
					<button
					onClick={() => setIsOpen(false)}
					className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
					>
					<FiX size={20} />
					</button>
				</div>

				<form onSubmit={handleCreatePartner} className="space-y-4">
					<div>
					<label className="block text-sm">Name</label>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="w-full px-3 py-2 rounded text-black text-sm"
						onChange={(e) => setName(e.target.value)}
					/>
					</div>

					<div>
					<label className="block text-sm">Email</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full px-3 py-2 rounded text-black text-sm"
						onChange={(e) => setEmail(e.target.value)}
					/>
					</div>

					<div>
					<label className="block text-sm">Capabilities</label>
					<input
						type="text"
						name="capabilities"
						placeholder="Capabilities"
						className="w-full px-3 py-2 rounded text-black text-sm"
						onChange={(e) => setCapabilities(e.target.value)}
					/>
					</div>

					<div>
					<label className="block text-sm">Password</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full px-3 py-2 rounded text-black text-sm"
						onChange={(e) => setPassword(e.target.value)}
					/>
					</div>

					<button
					type="submit"
					className="w-full bg-white text-black font-medium py-2 rounded hover:bg-gray-200 text-sm"
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
					<StatCard
						name='Total Users'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='New Users Today' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />
					<StatCard
						name='Active Users'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' />
				</motion.div>

				<UsersTable />

				{/* USER CHARTS 
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div>*/}
			</main>
		</div>
	);
};
export default UsersPage;
