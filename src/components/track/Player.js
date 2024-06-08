import React, { useContext } from 'react';
import { SearchContext } from '../../context/searchContext';

export const Player = () => {
  const { chooseTrack } = useContext(SearchContext)
  return (
    <>
      <div className="border d-flex justify-content-between align-items-center p-2 bg-light">
        <div className="d-flex ">
          <img src={chooseTrack.albumUrl} alt="" />
          <div className="ms-2 me-2" style={{ whiteSpace: 'nowrap', overflow: 'scroll', textOverflow: 'ellipsis', maxWidth: '100px' }}>
            <div className="">{chooseTrack.title}</div>
            <div className="text-muted">{chooseTrack.artists}</div>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          {chooseTrack.preview_url ? (
            <audio controls>
              <source src={chooseTrack.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="">無法播放此首歌曲</p>
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};
