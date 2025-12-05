
import pokemonData from "@/data/pokemonIndex.json"
import React from 'react'

const Settings = async () => {
  pokemonData.forEach((pokemon) => console.log(pokemon.name))


  return (
    <div>Settings</div>
  )
}

export default Settings