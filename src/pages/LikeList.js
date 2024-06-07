import React, { useEffect, useState, useContext } from 'react'
import { Track } from '../components/track/Track';
import { TrackApi } from '../Api/TrackApi';
import { LocalStorage } from "../utils/LocalStorage";
import { SearchContext } from '../context/searchContext'

export const LikeList = () => {
  const [likeList, setLikeList] = useState([]);
  const userToken = LocalStorage.getAuthToken()
  const { setTrack } = useContext(SearchContext)
  useEffect(() => {
    TrackApi.getLikeList(userToken)
      .then((response) => response.json())
      .then((result) => setLikeList(result.data))
      .catch((error) => console.error(error));
  }, [])
  return (
    <>
      <div>LikeList</div>
      {likeList && likeList.map((track) => {
        return <Track track={track} key={track.uri} setTrack={setTrack} url={track.preview_url} />
      })}
    </>
  )
}
