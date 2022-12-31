import {useState} from 'react'

import { GiveawayCard } from '../giveawayCard/GiveawayCard';
import './GiveawaysDirectory.scss'


export const GiveawaysDirectory = ({giveaways}) => {

  // const [gamesList, setGamesList] = useState(giveaways)
  const [query , setQuery ] = useState('')

  const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query))

}
const searchedGames = search(giveaways)

  return (
    <div >




<input 
        type = "text"
        placeholder='search'
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <h1>Free games</h1>
        <div className="giveaways-directory">
        {searchedGames?.map((giveaway) => (

            <GiveawayCard giveaway={giveaway} key={giveaway.id}/>
        ))}
        </div>

    </div>
  )
}

export default GiveawaysDirectory