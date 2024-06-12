import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../../context/searchContext'
import { Link } from 'react-router-dom'
import { LocalStorage } from "../../utils/LocalStorage"
import { TrackApi } from '../../Api/TrackApi'
import { CollectionApi } from '../../Api/CollectionApi'


export default function Track() {

  const { track, setTrack, setChooseTrack } = useContext(SearchContext)
  const [collections, setCollections] = useState('')
  const [isLike, setIsLike] = useState(false)
  const [isCollect, setIsCollect] = useState(false)
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
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          setIsLike(true)
        }
      })
      .catch((error) => console.error(error));
  }
  // console.log('collections', collections)
  const handleAddBtnClick = (collectionId) => {
    if (!track.uri) return
    const trackId = track.uri.split(":").pop()
    CollectionApi.addTrack(userToken, trackId, collectionId, track)
      .then((response) => response.json())
      .then((result) => {
        setIsCollect(true)
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
          <i className={`fa-regular fa-xl cursor ${!isLike ? 'fa-heart' : 'fa-solid fa-heart-circle-check'}`}></i>
        </div>
        {/* add track to collection */}
        <div className="btn-group dropend">
          <button type="button" className="btn shadow-none text-secondary" data-bs-toggle="dropdown" aria-expanded="false" disabled={!track}>
            <i className={`fa-regular fa-xl cursor ${!isCollect ? 'fa-solid fa-plus' : 'fa-circle-check'}`}></i>
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