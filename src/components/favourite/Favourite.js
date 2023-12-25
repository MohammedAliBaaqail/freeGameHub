import { useEffect, useState } from 'react'
import { useAddFavouriteGameMutation ,
    useRemoveFavouriteGameMutation,
  useGetFavoriteGamesQuery } from '../../services/userFavouriteGamesApi'
import "./Favourite.scss"


export const Favourite = ({game , user }) => {
    const [favourite, setFavourite] = useState(false)
    const [addFavouriteGame, { isLoading: addIsLoading, error }] = useAddFavouriteGameMutation()
    const [removeFavouriteGame, { isLoading: removeIsLoading, error: removeError }] = useRemoveFavouriteGameMutation()
    const { data: userFavouriteGames, isLoading: isFavouriteLoading} = useGetFavoriteGamesQuery(user)



 
    // if (removeIsLoading) return 'Loading...'
    // if (removeError) return `Error! ${removeError.message}`
    // if (isLoading) return 'Loading...'
    // if (error) return `Error! ${error.message}`

    // const initialFavourite = useEffect(() => {
    //   console.log("isFavouriteLoading",isFavouriteLoading)
    //   console.log("userFavouriteGames",userFavouriteGames)

 
    //   if (!isFavouriteLoading) {
    //         // const getGames = await fetch(`http://localhost:4000/user/getFavouriteGames/${user.username}`)
    //         // const games = await getGames.json()
    //         const gameInFavouriteList = userFavouriteGames.includes(game)
    //         console.log(gameInFavouriteList)
    //         setFavourite(gameInFavouriteList)
    //   }
        
        
    // }, [isFavouriteLoading,userFavouriteGames])
    // console.log(isFavouriteLoading)
    // console.log(userFavouriteGames)

    const handleFavouriteGame = async () => {
            //check if game is already in favourite list
            //if it is, remove it
            //if it isn't, add it
            // console.log(game)
            // console.log(user.username)
            // console.log(userFavouriteGames)
            const getGames = await fetch(`https://freegamehub-backend.adaptable.app/user/getFavouriteGames/${user.username}`)
            const games = await getGames.json()
            

            const gameInFavouriteList = games.includes(game)

            if (!gameInFavouriteList) {
        try {
            const result = await addFavouriteGame({username: user.username, game: game})

            setFavourite(true)

        } catch (err) {
            console.error('Failed to add favourite game: ', err)
        }
    } else {
      try{
        const result = await removeFavouriteGame({username: user.username, game: game})

        setFavourite(false)

      }
      catch (err) {
        console.error('Failed to remove favourite game: ', err)
      }
    }
  }
  useEffect(() => {
    const fetchComments = async () => {
  
     
      // if (!isFavouriteLoading) {
      //   setIsfavourite(userFavouriteGames.find((game) => game.id === id));
       
      // }

      const favouriteGames = await fetch(`https://freegamehub-backend.adaptable.app/user/getFavouriteGames/${user.username}`);
      const games = await favouriteGames.json();
      const fav = games.includes( game);
      setFavourite(fav)

  
  
    };
  
    fetchComments();
  }, [ favourite]);
  if (isFavouriteLoading) return <div className="loading-favourite"><div className="loading-ring"><div></div><div></div><div></div><div></div></div>  </div>;
  return (
    <div className='favourite-game'>
        {/* add a button to toggle css class based of state */}
        {/* <button onClick={() => handleFavouriteGame()} className={favourite? 'isFavourite liked' : 'notFavourite'}>Favourite</button> */}
        <div onClick={() => handleFavouriteGame()} className={favourite? 'favourite-button isfavourite' : 'favourite-button'}></div>
       
    </div>
  )
}
