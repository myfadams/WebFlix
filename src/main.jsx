import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css"
import SignUp from "./screens/SignUp";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
	<BrowserRouter basename="/">
		<Routes>
			<Route index element={<App/>} />
			<Route path="register" element={<SignUp />} />
		</Routes>
	</BrowserRouter>
);
