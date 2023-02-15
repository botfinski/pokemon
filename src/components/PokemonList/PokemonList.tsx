import React from "react";

interface Props {
	data: any;
	handlePage: (type: string) => void;
	isLoading: boolean;
	currentPage: number;
	lastPage: number;
}

export const PokemonList: React.FC<Props> = ({
	data,
	handlePage,
	isLoading,
	currentPage,
	lastPage,
}) => {
	const { results } = data;

	return (
		<div className="PokemonList">
			{!isLoading &&
				results.map((result: any) => <p key={result.name}>{result.name}</p>)}
			<button disabled={isLoading} onClick={() => handlePage("first")}>
				First
			</button>
			<button
				disabled={isLoading || currentPage === 0}
				onClick={() => handlePage("prev")}
			>
				Prev
			</button>
			<button
				disabled={isLoading || currentPage === lastPage}
				onClick={() => handlePage("next")}
			>
				Next
			</button>

			<button disabled={isLoading} onClick={() => handlePage("last")}>
				Last
			</button>
		</div>
	);
};
