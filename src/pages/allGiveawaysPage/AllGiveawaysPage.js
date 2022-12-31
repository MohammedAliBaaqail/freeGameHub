import { useGetGiveawaysQuery } from '../../services/giveawaysApi'

import GiveawaysDirectory from '../../components/giveawaysDirectory/GiveawaysDirectory';
import { Loading } from '../../components/loading/Loading';


const AllGiveawaysPage = () => {
    const { data , isFetching} = useGetGiveawaysQuery();
    if (isFetching) return <Loading/>

    const giveaways = data
    

  return (
    <div>

        <GiveawaysDirectory giveaways={giveaways}/>
    </div>
  )
}

export default AllGiveawaysPage