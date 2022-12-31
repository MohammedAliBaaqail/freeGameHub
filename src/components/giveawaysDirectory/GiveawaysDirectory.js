import {useState} from 'react'

import { GiveawayCard } from '../giveawayCard/GiveawayCard';


export const GiveawaysDirectory = ({giveaways}) => {

  // const [gamesList, setGamesList] = useState(giveaways)
  const [query , setQuery ] = useState('')

  const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query))

}
const searchedGames = search(giveaways)

  return (
    <div>GiveawaysGames




<input 
        type = "text"
        placeholder='search'
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <h1>Free games</h1>
        {searchedGames?.map((giveaway) => (

            <GiveawayCard giveaway={giveaway} key={giveaway.id}/>
        ))}

    </div>
  )
}

export default GiveawaysDirectory