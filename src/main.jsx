import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css"
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import SelectUser from "./screens/SelectUser";
import Home from "./screens/Home";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
	<BrowserRouter basename="/">
		<Routes>
			<Route index element={<App />} />
			<Route path="register" element={<SignUp />} />
			<Route path="login" element={<SignIn />} />
			<Route path="selectProfile" element={<SelectUser />} />
			<Route path="home" element={<Home />} />
		</Routes>
	</BrowserRouter>
);
