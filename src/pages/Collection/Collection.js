import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CollectionApi } from '../../Api/CollectionApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { Track } from '../../components/track/Track';
import { SearchContext } from '../../context/searchContext'

export default function Collection() {
  const collectionId = window.location.href.split('/collection/').pop()
  const userToken = LocalStorage.getAuthToken()
  const [collection, setCollection] = useState([])
  const { setTrack } = useContext(SearchContext)

  let lightMode = false
  const secondTextColor = lightMode ? 'text-darkmode-secondary' : 'text-white';
  const backgroundColor = lightMode ? 'bg-light' : 'bg-darkmode-main';

  useEffect(() => {
    CollectionApi.getCollection(userToken, collectionId)
      .then((response) => response.json())
      .then((result) => {
        setCollection(result.data)
      })
      .catch((error) => console.error(error));
  }, [])

  return (
    <>
      <div className="row">
        <div className={`d-flex flex-column col-12 ${secondTextColor}`}>
          <h4 className='fs-4 m-3'>{collection.collectionName}</h4>
          <table className={`${backgroundColor}`}>
            <thead>
              <tr className='border-bottom border-white'>
                <th scope="col">#</th>
                <th scope="col">名稱</th>
                <th scope="col"></th>
                <th scope="col">修改</th>
              </tr>
            </thead>
            <tbody>
              {collection.tracks && collection.tracks.map((track, index) => {
                return <Track track={track} key={track.uri} setTrack={setTrack} url={track.preview_url} index={index} page='LikeList' />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

}
