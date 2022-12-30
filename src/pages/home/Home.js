
import { useGetGamesQuery } from '../../services/gamesApi'

import { Loading } from '../../components/loading/Loading';
import GameCard from '../../components/gameCard/GameCard';

import './Home.scss'

export const Home = () => {
    const { data , isFetching} = useGetGamesQuery();
    if (isFetching) return <Loading/>
    
    var games = data

    
    const populerGames = [540,516,475,466,452,21,23,57] 
    const populerShooters = [540,466,452,23]
    const popularMMOS= []
    
    
    return (
    <div>
            <h1>hero section here </h1>

            <h1 >Populer </h1>
            <div className="popular-games">
            {games.map((game) => (
                populerGames.includes(game.id) ?
                 <div className='home-game-card'> <GameCard game={game} key={game.id}/> </div>: ''
            ))}
            </div>
            

    </div>

  )
}


export default Home