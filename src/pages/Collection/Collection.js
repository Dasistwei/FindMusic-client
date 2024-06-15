import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CollectionApi } from '../../Api/CollectionApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { Track } from '../../components/track/Track';
import { SearchContext } from '../../context/searchContext'

export default function Collection() {
  const collectionId = window.location.href.split('/collection/').pop()
  const userToken = LocalStorage.getAuthToken()
  const [tracks, setTracks] = useState([])
  const { setTrack } = useContext(SearchContext)
  useEffect(() => {
    CollectionApi.getCollection(userToken, collectionId)
      .then((response) => response.json())
      .then((result) => {
        setTracks(result.data)
      })
      .catch((error) => console.error(error));
  }, [])

  return (
    <>
      <div className='border d-flex flex-column'>
        <div>Collection</div>
        <table className="table table-light">
          <thead>
            <tr className=''>
              <th scope="col">#</th>
              <th scope="col">名稱</th>
              <th scope="col"></th>
              <th scope="col">修改</th>
            </tr>
          </thead>
          <tbody>
            {tracks && tracks.map((track, index) => {
              return <Track track={track} key={track.uri} setTrack={setTrack} url={track.preview_url} index={index} page='Collection' collectionId={collectionId} />
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
