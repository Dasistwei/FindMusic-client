import React from 'react';
import { useNavigate } from 'react-router-dom'
import { TrackApi } from "../../Api/TrackApi"
import { CollectionApi } from "../../Api/CollectionApi"
import { LocalStorage } from '../../utils/LocalStorage';
import { Link } from 'react-router-dom';
export const Track = ({ track, setTrack, index, page, collectionId }) => {

  const navigate = useNavigate()
  const userToken = LocalStorage.getAuthToken()
  const handlePlay = () => {
    setTrack(track);
    navigate(`/track/${track.uri}`)
  };
  const handleRemoveBtnClick = () => {
    if (page === 'Collection') {
      console.log('userToken, track._id, collectionId', userToken, track.trackId, collectionId)
      return CollectionApi.removeTrack(userToken, track.trackId, collectionId)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          window.location.reload()
        })
        .catch((error) => console.error(error));
    } else if (page === 'LikeList') {
      return TrackApi.userRemoveLike(userToken, track._id)
        .then((response) => response.text())
        .then((result) => {
          console.log(result)
          window.location.reload()
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <>
      <tr key={track._id}>
        <th scope="row">{index + 1}</th>
        <td className=''>
          <div className="m-2 d-flex align-items-center" >
            <img src={track.albumUrl} alt="album-logo" style={{ height: '64px', width: '64px' }} />
            <div className="ms-2">
              <div style={{ cursor: 'pointer' }} onClick={handlePlay}>{track.title}</div>
              <div className="text-muted">{track.artists}</div>
            </div>
          </div>
        </td>
        <td>
        </td>
        <td>
          <button className="btn btn-outline-primary" onClick={handleRemoveBtnClick}>移除</button>
        </td>
      </tr>
    </>
  );
};
