import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import {useState} from "react"

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
					<div className="bg-[#1E1E1E] rounded-lg shadow-lg max-w-sm w-full p-6">
						<div className="flex justify-end gap-2">
							<button
								onClick={() => setIsOpen(false)}
								className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
							>
								Close
							</button>
			
						</div>
						<form onSubmit={handleCreatePartner}>
							<h1 style={{fontSize: '17px'}}>Create Partner</h1>
							<div className='flex flex-col text-left text-white'>
								<>
									<p style={{fontSize: '14px'}}>Name</p>
									<input style={{fontSize: '14px', color: 'black'}} name="name" type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>

								</>
								<>
									<p style={{fontSize: '14px'}}>Email</p>
									<input style={{fontSize: '14px', color: 'black'}} name="email" type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>

								</>
								<>
									<p style={{fontSize: '14px'}}>Capabilities</p>
									<input style={{fontSize: '14px', color: 'black'}} name="capabilities" type="text" placeholder="capabilities" onChange={(e)=>setCapabilities(e.target.value)}/>

								</>
								<>
									<p style={{fontSize: '14px'}}>Password</p>
									<input style={{fontSize: '14px', color: 'black'}} name="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

								</>
								<><button style={{fontSize: '14px'}} className='bg-white mt-4 text-black' type='submit'>Create</button></> 
							</div>
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
