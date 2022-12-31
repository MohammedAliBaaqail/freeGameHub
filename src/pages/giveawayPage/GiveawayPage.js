import { Loading } from '../../components/loading/Loading';
import { useGetGiveawayByIdQuery } from '../../services/giveawaysApi'
import { useParams } from 'react-router';
import { Button } from '../../components/button/Button';


export const GiveawayPage = () => {
    const {id} = useParams();
    const { data , isFetching} = useGetGiveawayByIdQuery(id);
    if (isFetching) return <Loading/>
    const giveaway = data
    const {title, worth, image ,description ,instructions , open_giveaway_url,platforms,end_date} = giveaway
    

  return (
    <div>
        <h1>{title}</h1>
        <h2>worth</h2>
        <h2>{worth}</h2>
        <img
        src={image}
        alt={title}
        />
        <h2>Description</h2>
        <p>{description}</p>
        <h2>Instructions</h2>
        <h3>{instructions}</h3>
        <h2>Platforms</h2>
        <h3>{platforms}</h3>
        <h2>End Date</h2>
        <h3>{end_date}</h3>
        <Button text="Open Giveaway" url ={open_giveaway_url}/>
        
        
    </div>
  )
}
