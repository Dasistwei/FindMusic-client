import { useContext } from 'react'
import { SearchContext } from '../../context/searchContext'
import { Link } from 'react-router-dom'
import { LocalStorage } from "../../utils/LocalStorage"
import { TrackApi } from '../../Api/TrackApi'
import { CollectionApi } from '../../Api/CollectionApi'

export default function Track() {
  const { track, setTrack, setChooseTrack } = useContext(SearchContext)
  const userToken = LocalStorage.getAuthToken()

  const handleHeartClick = () => {
    const trackId = track.uri.split(":").pop()
    TrackApi.userLike(userToken, track, trackId)
  }
  const handleAddClick = () => {
    const trackId = track.uri.split(":").pop()
    const collectionId = "6664429ddfbcdd394d037091"
    CollectionApi.addTrack(userToken, trackId, collectionId)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        // window.location.reload()
      })
      .catch((error) => console.error(error));
  }
  return (
    <div>
      Track
      <div className="">
        <img src={track.albumUrl} alt="album-logo" />
        <h4>{track.title}</h4>
        <p>
          <Link to={`/artist/${track.artistsUri}`}>{track.artists}</Link>
        </p>
        <p>{track.albumName}</p>
        <div className="" onClick={handleHeartClick}>
          <span className="material-symbols-outlined cursor">
            favorite
          </span>
        </div>
        <div className="" onClick={handleAddClick}>
          <span className="material-symbols-outlined cursor">
            add
          </span>
        </div>
        <button onClick={() => setChooseTrack(track)}>play</button>
      </div>
    </div>
  )
}
