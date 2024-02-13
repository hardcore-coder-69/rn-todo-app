import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import AboutUs from "./Components/AboutUs/AboutUs";

function App() {
	return (
		<Router>
			<Fragment>
				<section className="App">
					<Header />
					<Routes>
						<Route exact path="/" element={<Main/>} />
						<Route exact path="/about" element={<AboutUs/>} />
					</Routes>
					<Footer />
				</section>
			</Fragment>
		</Router>
	)
}

export default App 
