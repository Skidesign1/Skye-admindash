import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/common/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
import SettingsPage from "./pages/SettingsPage";
import Sidebar from "./components/common/Sidebar";
import PartnerDetails from "./pages/PartnerDetails";
import CreativeDetails from "./pages/CreativeDetails";
// import ProtectedRoute from "./components/ProtectedRoute";

const isAuthenticated =localStorage.getItem("auth") === "true";

function App() {
	return( 
	
		<div className='flex h-screen bg-white text-black overflow-hidden'>
			<Routes>
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
				path="/dashboard"
				element={
					<div className="flex w-full h-full bg-black text-white">
						{/* <ProtectedRoute> */}
							<Sidebar />
							<Dashboard />
						{/* </ProtectedRoute> */}
					</div>
				}
				/>
				<Route
				path="/analytics"
				element={
					<div className="flex w-full h-full bg-black text-white ">
                  <Sidebar />
				  <AnalyticsPage />
					</div>
					}
				/>
				<Route
				path="/products"
				element={
					<div className="flex w-full h-full bg-black text-white">
                  <Sidebar />
				  <ProductsPage />
					</div>
					}
				/>
				<Route
				path="/users"
				element={
					<div className="flex w-full h-full bg-black text-white">
                  <Sidebar />
				  <UsersPage />
					</div>
					}
				/>
				<Route
				path="/orders"
				element={
					<div className="flex w-full h-full bg-black text-white">
                  <Sidebar />
				  <OrdersPage />
					</div>
					}
				/>
				<Route
				path="/settings"
				element={
					<div className="flex w-full h-full bg-black text-white">
                  <Sidebar />
				  <SettingsPage />
					</div>
					}
				/>
  				<Route path="/partners/:partnerId" element={<PartnerDetails />} />
  				<Route path="/creatives/:creativeId" element={<CreativeDetails />} />
			</Routes>

		</div>
		
	);
};

export default App;
