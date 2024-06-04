import React from 'react';
import { useNavigate } from 'react-router-dom'

export const TrackSearchResults = ({ track, setTrack }) => {
  const navigate = useNavigate()
  const handlePlay = () => {
    console.log('track', track)
    setTrack(track);
    navigate(`/track/${track.uri}`)
  };
  return (
    <div className="m-2 d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={handlePlay}>
      <img src={track.albumUrl} alt="album-logo" style={{ height: '64px', width: '64px' }} />
      <div className="ms-2">
        <div>{track.title}</div>
        <div className="text-muted">{track.artists}</div>
      </div>
    </div>
  );
};
