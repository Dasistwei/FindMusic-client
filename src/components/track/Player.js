import React, { useContext, useState, useEffect, useRef } from 'react';
import { SearchContext } from '../../context/searchContext';
import { ProgressBar } from 'react-bootstrap';

export const Player = () => {
  const { chooseTrack } = useContext(SearchContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.1)

  const loaderRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // console.log('audio ref', audioRef.current.volume = volume)

  const handleAudioPlay = () => {
    loaderRef.current.classList.add('active')
  }
  const handleAudioPause = () => {
    loaderRef.current.classList.remove('active')
  }
  const handleTogglePlayClick = () => {
    setIsPlaying(!isPlaying)
  }
  return (
    <>
      <div className="border d-flex justify-content-between align-items-center p-2">
        <div className="d-flex">
          <div className="loader align-self-center me-2" ref={loaderRef}></div>
          <img src={chooseTrack.albumUrl} alt="" />
          <div className="ms-2 me-2" style={{ whiteSpace: 'nowrap', overflow: 'scroll', textOverflow: 'ellipsis', maxWidth: '100px' }}>
            <div className="">{chooseTrack.title}</div>
            <div className="text-muted">{chooseTrack.artists}</div>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          {chooseTrack.preview_url ? (
            <>
              <audio ref={audioRef}
                // controls
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
              >
                <source src={chooseTrack.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button className='btn shadow-none border-0' onClick={handleTogglePlayClick}>
                {!isPlaying ? <i className="fa-solid fa-play fa-xl"></i> :
                  <i className="fa-solid fa-pause fa-xl"></i>
                }
              </button>

            </>
          ) : (
            <p className="">無法播放此首歌曲</p>
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};
