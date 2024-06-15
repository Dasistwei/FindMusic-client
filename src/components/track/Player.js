import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { SearchContext } from '../../context/searchContext';
import { ProgressBar } from 'react-bootstrap';

export const Player = () => {
  const { chooseTrack } = useContext(SearchContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(4)
  const [progressTime, setProgressTime] = useState(0)

  const loaderRef = useRef(null)
  const audioRef = useRef(null)
  const timeRef = useRef(null)
  const volumeRef = useRef(null)

  const progressRef = useRef(null)
  const intervalRef = useRef(null)

  let lightMode = false
  const lightModeBorder = lightMode ? 'border' : '';
  const secondTextColor = lightMode ? 'text-darkmode-secondary' : 'text-white';
  const mainTextColor = lightMode ? 'text-secondary' : 'text-secondary-light';
  const thirdBgColor = lightMode ? 'bg-primary' : 'bg-info';
  useEffect(() => {
    audioRef.current.volume = volume / 10
    // volumeRef.current.style = `linear-gradient(to right, #609EC2 ${volume * 10}%, #6C757D ${volume * 10}%)`;
  }, [])


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

  const handleVolumeInput = (e) => {
    setVolume(Number(e.target.value))
    let progress = volumeRef.current.value
    volumeRef.current.style.background = `linear-gradient(to right, #609EC2 ${progress * 10}%, #6C757D ${progress * 10}%)`;
    audioRef.current.volume = progress / 10
    // console.log('e.target.value', volumeRef.current.value)
  }
  return (
    <>
      <div className="d-flex justify-content-around align-items-center p-2 h-100">
        {/* track info */}
        <div className="d-flex h-100">
          <div className="volume-loader align-self-center me-2" ref={loaderRef}></div>
          <img src={chooseTrack.albumUrl} alt="" className='playerImg' />
          <div className="ms-2 me-2" style={{ whiteSpace: 'nowrap', overflow: 'scroll', textOverflow: 'ellipsis', maxWidth: '100px' }}>
            <div className={`${secondTextColor}`}>{chooseTrack.title}</div>
            <div className={`${mainTextColor}`}>{chooseTrack.artists}</div>
          </div>
        </div>

        {/* audio player */}
        {chooseTrack.preview_url &&
          <button className={`btn shadow-none ${secondTextColor}`} onClick={handleTogglePlayClick}>
            {!isPlaying ? <i className="fa-solid fa-play fa-xl"></i> :
              <i className="fa-solid fa-pause fa-xl"></i>
            }
          </button>
        }
        <div className="flex-row  w-50 h-100  d-flex flex-column justify-content-around">
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
              {/* <button className={`btn shadow-none ${secondTextColor}`} onClick={handleTogglePlayClick}>
                {!isPlaying ? <i className="fa-solid fa-play fa-xl"></i> :
                  <i className="fa-solid fa-pause fa-xl"></i>
                }
              </button> */}
              <div className="d-flex bar justify-content-between align-items-center ">
                <span id="auidioStart" className={`flex-grow-1 ${secondTextColor}`} ref={timeRef}>0:00</span>
                <div className=" flex-grow-10 me-3 ms-3 d-flex  align-items-center  w-100 position-relative bg-secondary ">
                  {/* <input type="range" className="position-absolute" id="bar" min="0" max="29" /> */}
                  <div className={`bar2 ${thirdBgColor} position-relative`} ref={progressRef}>
                    {/* <div className="dot bg-primary rounded-circle position-absolute"></div> */}
                  </div>
                </div>
                <span id="auidioStart" className={`flex-grow-1 ${secondTextColor}`}>0:29</span>
              </div>
            </>
          ) : (
            <p className="">無法播放此首歌曲</p>
          )}
        </div>

        {/* volume */}
        <div className="vol col-1 col-md-2 d-flex align-items-center h-100">
          <div className={`${secondTextColor}`}>
            <i className="fa-solid fa-volume-high fa-xl"></i>
          </div>
          <div className={`vol-bar flex-grow-5 me-3 ms-3 d-flex align-items-center ${thirdBgColor}`}>
            <input type="range" className=" bar2" id="bar" min="0" max="10" onInput={handleVolumeInput} ref={volumeRef} value={volume} />
          </div>
        </div>
      </div>
    </>
  );
};
