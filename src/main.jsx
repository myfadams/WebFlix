import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css"
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import SelectUser from "./screens/SelectUser";
import Home from "./screens/Home";
import Upload from "./screens/Upload";
import Details from "./screens/Details";
import Video from "./screens/Video";
import BrowseScreen from "./screens/BrowseScreen";
import SearchPage from "./screens/SearchPage";
import { AuthProvider } from "./context/Context";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
	<AuthProvider>
		<BrowserRouter basename="/">
			<Routes>
				<Route index element={<App />} />
				<Route path="register" element={<SignUp />} />
				<Route path="login" element={<SignIn />} />
				<Route path="selectProfile" element={<SelectUser />} />
				<Route path="home" element={<Home />} />
				<Route path="upload" element={<Upload />} />

				<Route path="details/:movieName" element={<Details />} />
				<Route path="movie/:movieName" element={<Video />} />
				<Route path="browse/:category" element={<BrowseScreen />} />
				<Route path="search" element={<SearchPage />} />
			</Routes>
		</BrowserRouter>
	</AuthProvider>
);
