import React, { useEffect, useState, useContext } from 'react'
import { Track } from '../components/track/Track';
import { TrackApi } from '../Api/TrackApi';
import { LocalStorage } from "../utils/LocalStorage";
import { SearchContext } from '../context/searchContext'
import { Link } from 'react-router-dom';
export const LikeList = () => {
  const [likeList, setLikeList] = useState([]);
  const [editValue, setEditValue] = useState('');
  const userToken = LocalStorage.getAuthToken()
  const { setTrack } = useContext(SearchContext)
  useEffect(() => {
    TrackApi.getLikeList(userToken)
      .then((response) => response.json())
      .then((result) => setLikeList(result.data))
      .catch((error) => console.error(error));
  }, [])
  const handleDeleteBtnClick = () => { }
  return (
    <div className='border d-flex flex-column'>
      <div>LikeList</div>
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
          {likeList && likeList.map((track, index) => {
            return <Track track={track} key={track.uri} setTrack={setTrack} url={track.preview_url} index={index} page='LikeList' />
          })}
        </tbody>
      </table>
    </div>
  )
}
