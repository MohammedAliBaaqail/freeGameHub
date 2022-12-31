import {useState} from 'react'

import GameCard from '../gameCard/GameCard'
import './GamesDirectory.scss'

export const GamesDirectory = ({games}) => {
// const [gamesList , setGamesList] = useState(games)
const [query , setQuery ] = useState('')

const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query))

}

const searchedGames = search(games)

    


  return (
    <div>
        <input 
        type = "text"
        placeholder='search'
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <h1>Free to play games</h1>
        <div className="games-directory">
        {searchedGames?.map((game) => (

            <GameCard game={game} key={game.id}/>
        ))}
        </div>
    </div>

    )
}

export default GamesDirectory
