import { PokemonDataMin } from '@/interfaces/interfaces'
import { weServTransformURL } from '@/utils/weServTransform'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PokedexResults = ({pokedex}: {pokedex: PokemonDataMin[]}) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 max-w-350 mx-auto">
        {pokedex.map((pokemon) =>
          pokemon.image != null ? (
            <Link
              href={`/pokemon/${pokemon.name.toLowerCase()}`}
              key={pokemon.dexNr}
              className="max-w-max"
            >
              <div className="items-center max-w-28 border-b-2 rounded-lg">
                <Image
                  src={weServTransformURL(pokemon.image, "pokedexImage")}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  className="overflow-hidden h-20 object-scale-down p-1"
                />
                <div className="text-xs flex flex-col gap-1 m-2 min-w-fit truncate text-center">
                  <p className="text-muted-foreground">#{pokemon.dexNr}</p>
                  <p className="text-[9px] sm:text-xs">{pokemon.name}</p>
                </div>
              </div>
            </Link>
          ) : null
        )}
      </div>
  )
}

export default PokedexResults