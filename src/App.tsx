import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonList } from "./components/PokemonList/PokemonList";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [lastPage, setLastPage] = useState<number>(0);
	const [count, setCount] = useState<number>(0);
	const [pokemonList, setPokemonList] = useState<any>({});
	const [errors, setErrors] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchPokemonList = async (query: string, page: number) => {
		setIsLoading(true);
		setCurrentPage(page);

		await axios
			.get(`${API_URL}${query}`)
			.then(results => {
				setCount(results.data.count);
				setLastPage(Math.floor(results.data.count / 10));
				setPokemonList(results.data);
				setErrors([]);
			})
			.catch(error => {
				if (error.response) {
					console.error(error.response);
				} else if (error.request) {
					console.error(error.request);
					setErrors(prev => [
						...prev,
						`There was an error while processing your request - see console for more details.`,
					]);
					setIsLoading(false);
				} else {
					console.error(error);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handlePage = (type: string) => {
		if (type === "first") {
			fetchPokemonList(`?limit=10&offset=0`, 0);
		}
		if (type === "last") {
			fetchPokemonList(`?limit=1279&offset=1270`, lastPage);
		}
		if (type === "next") {
			fetchPokemonList(
				`?limit=10&offset=${(currentPage + 1) * 10}`,
				currentPage + 1
			);
		}
		if (type === "prev") {
			if (currentPage > 0) {
				fetchPokemonList(
					`?limit=10&offset=${(currentPage - 1) * 10}`,
					currentPage - 1
				);
			} else {
				return;
			}
		}
	};

	useEffect(() => {
		fetchPokemonList("?limit=10&offset=0", 0);
	}, []);

	return (
		<div className="App">
			<main>
				{!isLoading && Object.keys(pokemonList).length === 0 && "empty"}
				{Object.keys(pokemonList).length > 0 && (
					<PokemonList
						isLoading={isLoading}
						currentPage={currentPage}
						lastPage={lastPage}
						data={pokemonList}
						handlePage={handlePage}
					/>
				)}
				{isLoading && "...loading"}
			</main>
			{errors.map((error, i) => (
				<p className="Error" key={i}>
					{error}
				</p>
			))}
		</div>
	);
}

export default App;
