import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../../context/searchContext'
import { Link } from 'react-router-dom'
import { LocalStorage } from "../../utils/LocalStorage"
import { TrackApi } from '../../Api/TrackApi'
import { CollectionApi } from '../../Api/CollectionApi'

export default function Track() {
  const { track, setChooseTrack } = useContext(SearchContext)
  const [collections, setCollections] = useState('')
  const [isLike, setIsLike] = useState(false)
  const [isCollect, setIsCollect] = useState(false)
  const userToken = LocalStorage.getAuthToken()
  // const url = window.location.href
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
      <div className="row">
        <div className="row d-flex align-items-center">
          <img src={track.albumUrl} alt="album-logo" className='col-3' />
          <div className="col-9 text-start">
            <h4 className='fs-1'>{track.title}</h4>
            <p>
              <Link to={`/artist/${track.artistsUri}`}>{track.artists}</Link>
            </p>
            <p>{track.albumName}</p>
          </div>
        </div>
        <div className="d-flex pt-3 pb-3 ">
          <div className="">
            <button className='btn btn-outline-primary' onClick={() => {
              setChooseTrack(track)
            }}>play</button>
          </div>
          <div className="align-self-center pe-3 ps-3" onClick={handleHeartClick}>
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
        </div>
      </div>
    </div>
  )
}
