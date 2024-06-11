import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../../context/searchContext'
import { Link } from 'react-router-dom'
import { LocalStorage } from "../../utils/LocalStorage"
import { TrackApi } from '../../Api/TrackApi'
import { CollectionApi } from '../../Api/CollectionApi'


export default function Track() {

  const { track, setTrack, setChooseTrack } = useContext(SearchContext)
  const [collections, setCollections] = useState('')
  const userToken = LocalStorage.getAuthToken()
  useEffect(() => {
    CollectionApi.getCollections(userToken)
      .then((response) => response.json())
      .then((result) => {
        setCollections(result.data)
      })
      .catch((error) => console.error(error));
  }, [])

  const handleHeartClick = () => {
    const trackId = track.uri.split(":").pop()
    TrackApi.userLike(userToken, track, trackId)
  }
  const handleAddBtnClick = (collectionId) => {
    if (!track.uri) return
    const trackId = track.uri.split(":").pop()
    CollectionApi.addTrack(userToken, trackId, collectionId, track)
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
        {/* add track to collection */}
        <div className="btn-group dropend">
          <button type="button" className="btn shadow-none text-secondary" data-bs-toggle="dropdown" aria-expanded="false" disabled={!track}>
            <span className="material-symbols-outlined cursor">
              add
            </span>
          </button>
          <ul className="dropdown-menu">
            {collections &&
              collections.map((collection) => {
                return <li key={collection._id} role='button' className="dropdown-item" onClick={() => handleAddBtnClick(collection._id)}>{collection.name}</li>
              })}
          </ul>
        </div>
        <div className="">
          <button className='btn btn-outline-primary' onClick={() => setChooseTrack(track)}>play</button>
        </div>
      </div>
    </div>
  )
}

// <Link to={`/album/${item.id}`}>{item.id}</Link>