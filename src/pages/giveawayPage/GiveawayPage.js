import { Loading } from '../../components/loading/Loading';
import { useGetGiveawayByIdQuery } from '../../services/giveawaysApi'
import { useParams } from 'react-router';
import { Button } from '../../components/button/Button';
import './GiveawayPage.scss'
import { Error } from '../../components/error/Error';

export const GiveawayPage = () => {
    const {id} = useParams();
    const { data , isFetching} = useGetGiveawayByIdQuery(id);
    if (isFetching) return <Loading/>
    const giveaway = data
    
    if (!giveaway) return <Error/>
    const {title, worth, image ,description ,instructions , open_giveaway_url,platforms,end_date} = giveaway
    

  return (
    <div>
        <h1 className='giveaway-page-title'>{title}</h1>
        <img
        src={image}
        alt={title}
        />
        <p className='giveaway-desc'>{description}</p>
        <h2 className='color-orange'>worth</h2>
        <h2>{worth}</h2>
      
        
        <h2 className='color-orange'>Instructions</h2>
        <p>{instructions}</p>
        <h2 className='color-orange'>Platforms</h2>
        <h3>{platforms}</h3>
        <h2 className='color-orange'>End Date</h2>
        <h3>{end_date}</h3>
        <Button text="Open " url ={open_giveaway_url}/>
        
        
    </div>
  )
}
