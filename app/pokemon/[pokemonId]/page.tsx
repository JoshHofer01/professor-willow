import { PokemonData } from '@/interfaces/interfaces';
import Image from 'next/image';
import React from 'react';

type Props = { params: Promise<{pokemonId: string}>};

const PokemonDetails = async ({ params }: Props) => {
	const { pokemonId } = await params;
	const response = await fetch(
		`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${pokemonId}.json`
	);

	if (!response.ok) {
		return <div>Failed to load Pokémon {pokemonId}</div>;
	}

	const data: PokemonData = await response.json();

	return (
		<div>
			<h1>{data.names?.English ?? data.id}</h1>
			{data.assets?.image && (
        <>
				<Image
					src={data.assets.image}
					alt={data.names?.English ?? data.id}
					width={240}
          height={240}
          className='min-w-20 max-w-24'
				/>
        <Image
					src={data.assets.shinyImage}
					alt={data.names?.English ?? data.id}
					width={240}
          height={240}
          className='max-w-28 max-h-28 object-scale-down'
				/>
        </>
			)}
			<p>
				Dex #: {data.dexNr} • Gen: {data.generation}
			</p>

      {/* Create display for evolutions with link for each evolution */}
			
      <p>
				Type: {data.primaryType?.type}
				{data.secondaryType ? ` / ${data.secondaryType.type}` : ''}
			</p>

			<h2>Stats</h2>
			<ul>
				<li>Stamina: {data.stats?.stamina}</li>
				<li>Attack: {data.stats?.attack}</li>
				<li>Defense: {data.stats?.defense}</li>
			</ul>

			<h2>Quick Moves</h2>
			<ul>
				{Object.values(data.quickMoves || {}).map((m) => (
					<li key={m.id}>
						{m.names?.English ?? m.id} — power {m.power} • energy {m.energy}
					</li>
				))}
			</ul>

			<h2>Cinematic Moves</h2>
			<ul>
				{Object.values(data.cinematicMoves || {}).map((m) => (
					<li key={m.id}>
						{m.names?.English ?? m.id} — power {m.power} • energy {m.energy}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonDetails;