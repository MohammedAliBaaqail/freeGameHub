import React from 'react'
import { useGetGamesByCategoryQuery } from '../../services/gamesApi'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/loading/Loading';
import GameCard from '../../components/gameCard/GameCard';

export const CategoryPage = () => {

    const {category} = useParams();
    const { data , isFetching} = useGetGamesByCategoryQuery(category);
    if (isFetching) return <Loading/>

    var games = data

    var gameCategory
     if (category === "card") {gameCategory = "Card Game"}
     else if (category === "MMO"  ) {gameCategory = ["MMO","MMORPG","MMOFPS","MMORTS"]}
     else if (category === "Strategy") {gameCategory = ["Strategy","MMORTS"]}
     else if (category === "Sports") {gameCategory = ["Sports","Racing"]}
    else {  gameCategory = category}
    
  return (
    <div>CategoryPage

            <div className="popular-games">
            {games.map((game) => (
                gameCategory.includes(game.genre) ?
                 <div className='home-game-card'> <GameCard game={game} key={game.id}/> </div>: ''
            ))}
            </div>


                {/* {games.map((game) => (

                <GameCard game={game} key={game.id}/>
))} */}
    </div>
  )
}


export default CategoryPage
