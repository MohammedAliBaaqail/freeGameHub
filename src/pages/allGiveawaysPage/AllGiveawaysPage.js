import { useGetGiveawaysQuery , useGetGiveawaysBySortKeyQuery , useGetGiveawaysWorthQuery } from '../../services/giveawaysApi'
import  { useState } from 'react';
import GiveawaysDirectory from '../../components/giveawaysDirectory/GiveawaysDirectory';
import { Loading } from '../../components/loading/Loading';

import { motion } from "framer-motion";
import animations from "../../animations/Animations"
import { Error } from '../../components/error/Error';

const AllGiveawaysPage = () => {
  const [sortingKey, setSortingKey] = useState(null);  
    const { data:giveaways , isFetching} = useGetGiveawaysQuery();
    const { data:sortedGiveaways ,isFetching: isFetchingSortedGiveaways} = useGetGiveawaysBySortKeyQuery(sortingKey);
    const { data:giveawaysWorth , isFetching:isFetchingGiveawaysWorth} = useGetGiveawaysWorthQuery();

    const handleSortingChange = (selectedSortingKey) => {
      setSortingKey(selectedSortingKey);
    };


if (!giveaways ) return <Error/>
  return (
    <motion.div
    className="all-giveaways-page"
    {...animations}
    >

        <GiveawaysDirectory isFetchingSortedGiveaways={isFetchingSortedGiveaways} handleSortingChange={handleSortingChange} isFetching={isFetching} giveaways={sortingKey ? sortedGiveaways : giveaways} giveawaysWorth={giveawaysWorth} isFetchingGiveawaysWorth={isFetchingGiveawaysWorth}/>
    </motion.div>
  )
}

export default AllGiveawaysPage