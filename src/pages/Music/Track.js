import { useContext } from 'react'
import { SearchContext } from '../../context/searchContext'
import { Link } from 'react-router-dom'

export default function Track() {
  const { track, setTrack, setChooseTrack } = useContext(SearchContext)
  // console.log('track', track)
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
        <button onClick={() => setChooseTrack(track)}>play</button>
      </div>
    </div>
  )
}
