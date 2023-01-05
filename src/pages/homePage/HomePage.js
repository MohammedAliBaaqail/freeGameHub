
import { useGetGamesQuery } from '../../services/F2PgamesApi'

import { Loading } from '../../components/loading/Loading';
import GameCard from '../../components/gameCard/GameCard';

import './Home.scss'

export const HomePage = () => {
    const { data , isFetching} = useGetGamesQuery();
    if (isFetching) return <Loading/>
    
    var games = data

    
    const populerGames = [540,516,475,466,452,21,23,57,523,517] 
    const populerShooters = [540,466,452,23]
    const popularMMOS= []
    



    
    return (
    <div>
            <div className="hero-section">
            <h1>Free Game Hub </h1>
            </div>

            <h1 >Populer </h1>
            <div className="popular-games">
            {games.map((game) => (
                populerGames.includes(game.id) ?
                 <div key={game.id} className='home-game-card'> <GameCard {...game} /> </div>: ''
            ))}
            </div>
            

    </div>

  )
}


export default HomePage