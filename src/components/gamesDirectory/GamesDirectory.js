import {useState} from 'react'

import GameCard from '../gameCard/GameCard'
import { Search } from '../search/Search'
import './GamesDirectory.scss'

export const GamesDirectory = ({games}) => {
// const [gamesList , setGamesList] = useState(games)
const [query , setQuery ] = useState('')

const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query))

}

const searchedGames = search(games)

    
const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };



  return (
    <div className='games-directory-container'>
        <div className="games-directory-search">
        <Search handleSearch={handleSearch} />
        </div>

        <h1>Free To Play Games</h1>
        <div className="games-directory">
        {searchedGames?.map((game) => (

            <GameCard {...game} key={game.id}/>
        ))}
        </div>

        
    
    </div>

    )
}

export default GamesDirectory


