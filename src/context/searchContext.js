import { spotifyApi } from '../Api/spotifyApi';
import { useState, useEffect, createContext } from 'react';
//context
export const SearchContext = createContext({});


const defaultChooseTrack = {
  "artists": "SZA",
  "artistsUri": "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP",
  "title": "Saturn",
  "uri": "spotify:track:1bjeWoagtHmUKputLVyDxQ",
  "albumUrl": "https://i.scdn.co/image/ab67616d00004851d70916ee9e40c90380ba5f07",
  "preview_url": "https://p.scdn.co/mp3-preview/74f603e906ab7a5409cf2edc6dda326ebe7c1d49?cid=6d6c82e90319486a86b127fc46235b9e"
}
export const SearchProvider = ({ children }) => {
  const [track, setTrack] = useState({})
  const [chooseTrack, setChooseTrack] = useState(defaultChooseTrack);
  const [accessToken, setAccessToken] = useState('');


  useEffect(() => {
    spotifyApi.getAccessToken()
      .then(result => {
        setAccessToken(result.access_token)
      })
      .catch((error) => console.error(error));
  }, [])
  return (
    <SearchContext.Provider value={{ track, setTrack, chooseTrack, setChooseTrack, accessToken }}>
      {children}
    </SearchContext.Provider>
  )
}
