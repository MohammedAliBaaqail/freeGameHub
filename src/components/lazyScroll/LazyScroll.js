import { useState } from "react";


import InfiniteScroll from "react-infinite-scroll-component";


export const LazyScroll = ({allItems }) => {
    const [items, setItems] = useState(allItems.slice(0, 20));
    const [hasMore, setHasMore] = useState(true);

    const nextItems = () => {
        setTimeout(() => {
          setItems(items.concat(allItems.slice(items.length, items.length + 18)));
          if (items.length >= allItems.length) {
            setHasMore(false);
          }
        }, 500);
      };


  return (
    <div>
        <InfiniteScroll
          dataLength={items.length}
          next={nextItems}
          hasMore={true}
          loader={
            hasMore ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> :''
          }

        >
   {items}
        </InfiniteScroll>

    </div>
  )
}
