import { Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, color, motion } from "framer-motion";
import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const SIDEBAR_ITEMS = [
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Creative", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Partners", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
	{name: "Logout", icon:LogOut, color: "#DC2626", href: "/logout"},
	
];

const Sidebar = () => {
	const navigate =useNavigate() ;
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const handleLogout = () => {
		localStorage.removeItem("userToken");
			navigate("/login", {replace: true});
		
	};
	
	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
			>
			
			<div className='h-full bg-gray-800 bg-opacity-50  p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>
				

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;
