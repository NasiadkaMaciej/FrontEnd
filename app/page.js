"use client";

import Navigation from "./components/Navigation";
import "./styles/styles.scss";

const HomePage = () => {
	return (
		<>
			<Navigation />
			<main>
				<section>
					<h1>Welcome to the Pokédex!</h1>
				</section>
			</main>
		</>
	);
};

export default HomePage;
