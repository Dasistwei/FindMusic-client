import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { SearchContext } from '../../context/searchContext';
import { ProgressBar } from 'react-bootstrap';

export const Player = () => {
  const { chooseTrack } = useContext(SearchContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.1)
  const [progressTime, setProgressTime] = useState(0)

  const loaderRef = useRef(null)
  const audioRef = useRef(null)
  const timeRef = useRef(null)

  const progressRef = useRef(null)
  const intervalRef = useRef(null)



  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return
    if (progressRef.current.style.width === "100%") {
      progressRef.current.style.width = "0%"
    } else {
      progressRef.current.style.width = `${progressTime * 100 / 29}%`
      timeRef.current.innerText = progressTime < 10 ? `0:0${progressTime}` : `0:${progressTime}`
    }
  }, [progressTime])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgressTime(Math.floor(audioRef.current.currentTime))
      }, 100);
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [isPlaying])

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
      <div className="d-flex justify-content-around align-items-center p-2">
        {/* track info */}
        <div className="d-flex">
          <div className="loader align-self-center me-2" ref={loaderRef}></div>
          <img src={chooseTrack.albumUrl} alt="" />
          <div className="ms-2 me-2" style={{ whiteSpace: 'nowrap', overflow: 'scroll', textOverflow: 'ellipsis', maxWidth: '100px' }}>
            <div className="">{chooseTrack.title}</div>
            <div className="text-muted">{chooseTrack.artists}</div>
          </div>
        </div>
        {/* audio player */}
        <div className="justify-content-center  flex-row  w-50">
          {chooseTrack.preview_url ? (
            <>
              <audio ref={audioRef}
                // controls
                volume={volume}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
              >
                <source src={chooseTrack.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button className='btn shadow-none border-0 text-secondary' onClick={handleTogglePlayClick}>
                {!isPlaying ? <i className="fa-solid fa-play fa-xl"></i> :
                  <i className="fa-solid fa-pause fa-xl"></i>
                }
              </button>
              <div className="d-flex justify-content-between align-items-center ">
                <span id="auidioStart" className='flex-grow-1' ref={timeRef}>0:00</span>
                <div className="bar flex-grow-10 me-3 ms-3 d-flex  align-items-center  w-100 position-relative bg-secondary ">
                  <input type="range" className="position-absolute" id="bar" min="0" max="29" />
                  <div className="bar2 bg-primary position-relative" ref={progressRef}>
                    <div className="dot bg-primary rounded-circle position-absolute"></div>
                  </div>
                </div>
                <span id="auidioStart" className='flex-grow-1'>0:29</span>
              </div>
            </>
          ) : (
            <p className="">無法播放此首歌曲</p>
          )}
        </div>

        {/* volume */}
        <div className="vol col-2 d-flex align-items-center">
          <div className="">
            <i className="fa-solid fa-volume-high fa-xl"></i>
          </div>
          <div className="vol-bar bar  flex-grow-5 me-3 ms-3 d-flex w-100 align-items-center position-relative bg-secondary ">
            <input type="range" className="position-absolute" id="bar" min="0" max="10" />
            <div className="bar2 bg-primary position-relative w-100">
              <div className="dot bg-primary rounded-circle position-absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
