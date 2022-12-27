import React from 'react'
import { useGetGamesByCategoryQuery } from '../../services/gamesApi'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/loading/Loading';
import GameCard from '../../components/gameCard/GameCard';

export const CategoryPage = () => {

    const {category} = useParams();
    const { data , isFetching} = useGetGamesByCategoryQuery(category);
    if (isFetching) return <Loading/>
    console.log(data)
    var games = data

    
  return (
    <div>CategoryPage
                {games.map((game) => (

                <GameCard game={game} key={game.id}/>
))}
    </div>
  )
}


export default CategoryPage
