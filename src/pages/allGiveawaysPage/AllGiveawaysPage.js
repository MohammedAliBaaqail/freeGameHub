import { useGetGiveawaysQuery } from '../../services/giveawaysApi'

import GiveawaysDirectory from '../../components/giveawaysDirectory/GiveawaysDirectory';
import { Loading } from '../../components/loading/Loading';

import { motion } from "framer-motion";
import animations from "../../animations/Animations"
import { Error } from '../../components/error/Error';

const AllGiveawaysPage = () => {
    const { data , isFetching} = useGetGiveawaysQuery();
    if (isFetching) return <Loading/>

    const giveaways = data
    if (!giveaways) return <Error/>
    

  return (
    <motion.div
    className="all-giveaways-page"
    {...animations}
    >

        <GiveawaysDirectory giveaways={giveaways}/>
    </motion.div>
  )
}

export default AllGiveawaysPage