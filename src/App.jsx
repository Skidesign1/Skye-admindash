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
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
	return (
		<div className="flex h-screen bg-white text-black overflow-hidden">
		<Routes>
			<Route path="/" element={<Navigate to="/login" />} />
			<Route path="/login" element={<LoginPage />} />

			<Route
			path="/dashboard"
			element={
				<ProtectedRoute>
				<div className="flex w-full h-full bg-black text-white">
					<Sidebar />
					<Dashboard />
				</div>
				</ProtectedRoute>
			}
			/>

			<Route
			path="/analytics"
			element={
				<ProtectedRoute>
				<div className="flex w-full h-full bg-black text-white">
					<Sidebar />
					<AnalyticsPage />
				</div>
				</ProtectedRoute>
			}
			/>

			<Route
			path="/products"
			element={
				<ProtectedRoute>
				<div className="flex w-full h-full bg-black text-white">
					<Sidebar />
					<ProductsPage />
				</div>
				</ProtectedRoute>
			}
			/>

			<Route
			path="/users"
			element={
				<ProtectedRoute>
				<div className="flex w-full h-full bg-black text-white">
					<Sidebar />
					<UsersPage />
				</div>
				</ProtectedRoute>
			}
			/>

			<Route
			path="/orders"
			element={
				<ProtectedRoute>
				<div className="flex w-full h-full bg-black text-white">
					<Sidebar />
					<OrdersPage />
				</div>
				</ProtectedRoute>
			}
			/>

			<Route
			path="/settings"
			element={
				<ProtectedRoute>
				<div className="flex w-full h-full bg-black text-white">
					<Sidebar />
					<SettingsPage />
				</div>
				</ProtectedRoute>
			}
			/>

			<Route
			path="/partners/:partnerId"
			element={
				<ProtectedRoute>
				<PartnerDetails />
				</ProtectedRoute>
			}
			/>

			<Route
			path="/creatives/:creativeId"
			element={
				<ProtectedRoute>
				<CreativeDetails />
				</ProtectedRoute>
			}
			/>
		</Routes>
		</div>
	);
}

export default App;
