import { useContext } from 'react'
import { SearchContext } from '../../context/searchContext'
import { Link } from 'react-router-dom'
import { LocalStorage } from "../../utils/LocalStorage"
import { TrackApi } from '../../Api/TrackApi'

export default function Track() {
  const { track, setTrack, setChooseTrack } = useContext(SearchContext)
  console.log('track', track)
  const handleHeartClick = () => {
    const userToken = LocalStorage.getAuthToken()
    // (jwt_token, track)
    TrackApi.userLike(userToken, track)
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
        <button onClick={() => setChooseTrack(track)}>play</button>
      </div>
    </div>
  )
}
