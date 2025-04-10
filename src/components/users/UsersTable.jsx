import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import PartnerBlockToggle from "../PartnerBlockToggle";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [partners, setPartners] = useState([]);
	const [filteredPartners, setFilteredPartners] = useState([]);
	const navigate = useNavigate();

	const deletePartner = async (partnerId, e) => {
		if (e) e.preventDefault();
		console.log(partnerId);

		try {
			const response = await fetch(`http://localhost:5000/api/admin/delete-partner/${partnerId}`, {
				method: "DELETE",
			});
			const data = await response.json();
			console.log(data);

			setPartners((prevPartnerList) =>
				prevPartnerList.filter((part) => part._id !== partnerId)
			);
			setFilteredPartners((prevFilteredList) =>
				prevFilteredList.filter((part) => part._id !== partnerId)
			);
		} catch (error) {
			console.log("error", error.message);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/admin/partners", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const partnersData = await response.json();
				setPartners(partnersData);
				setFilteredPartners(partnersData); 
				console.log(partnersData);
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 10000);

		return () => clearInterval(interval);
	}, []);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = partners.filter(
			(user) =>
				user.name.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term)
		);
		setFilteredPartners(filtered);
	};

	const handleRowClick = (e, id) => {
		// Prevent navigation if the click originated from a button
		if (e.target.closest("button") || e.target.closest("input")) return;
		navigate(`/partners/${id}`);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 1, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Created On
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Country
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredPartners.map((partner) => (
							<motion.tr
								key={partner._id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								onClick={(e) => handleRowClick(e, partner._id)}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{partner.name.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{partner.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{partner.email}</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{new Date(partner.createdAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full'>
										Nigeria
									</span>
								</td>

								<td className='px-6 py-4 flex gap-2 items-center whitespace-nowrap text-sm text-gray-300'>
									<PartnerBlockToggle
										partnerId={partner._id}
										isBlockedInitially={partner.isBlocked}
									/>
									<button
										onClick={(e) => deletePartner(partner._id, e)}
										className='text-red-400 hover:text-red-300'
									>
										Delete
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default UsersTable;
