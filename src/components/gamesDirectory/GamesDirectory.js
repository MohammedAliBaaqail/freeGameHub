import {useState} from 'react'

import GameCard from '../gameCard/GameCard'

export const GamesDirectory = ({games}) => {
const [gamesList , setGamesList] = useState(games)
const [query , setQuery ] = useState('')

const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query))

}

const searchedGames = search(gamesList)
console.log(searchedGames)
    


  return (
    <div>
        <input 
        type = "text"
        placeholder='search'
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <h1>Free to play games</h1>
        {searchedGames?.map((game) => (

            <GameCard game={game} key={game.id}/>
        ))}
    </div>

    )
}

export default GamesDirectory
