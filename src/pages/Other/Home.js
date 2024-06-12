import React, { useContext, useState, useEffect } from 'react'
import { spotifyApi } from '../../Api/spotifyApi'
import { SearchContext } from '../../context/searchContext'
import { CommonFunc } from '../../utils/CommonFunc'
const a = {
  artists: "Tiësto",
  artistsUri: "spotify:artist:2o5jDhtHVPhrJdv3cEQ99Z",
  title: "My City (feat. Katy Tiz)",
  uri: "spotify:album:3xNEWVkFaNdnAPmC0M5J0c",
  albumUrl: "https://i.scdn.co/image/ab67616d00004851fa74a2bcfa786ab6a65a0161"
}
export default function Home() {
  const { accessToken } = useContext(SearchContext)
  const [newReleases, setNewReleases] = useState([])

  useEffect(() => {
    if (newReleases.length > 0 || !accessToken) return
    spotifyApi.getNewReleases(accessToken)
      .then((response) => response.json())
      .then((result) => {
        setNewReleases(CommonFunc.mappingToMusicsArray(result))
      })
      .catch((error) => console.error(error));
  }, [accessToken])

  // console.log('new releases', newReleases)
  return (
    <div className='border vh-100 text-start '>
      <div className="">
        <h5>最新發行</h5>
        <swiper-container className="mySwiper" effect="coverflow" grab-cursor="true" centered-slides="true"
          slides-per-view="auto" coverflow-effect-rotate="50" coverflow-effect-stretch="0" coverflow-effect-depth="100"
          coverflow-effect-modifier="1" coverflow-effect-slide-shadows="true">
          {newReleases.length > 0 && newReleases.map((album) => {
            return (
              <swiper-slide onClick={() => { console.log('hi') }}>
                <img src={album.albumUrl} alt='album-logo' />
                <div className="info">
                  <p>{album.title}</p>
                  <p>{album.artists}</p>
                </div>
              </swiper-slide>
            )
          })}
        </swiper-container>
      </div>
      <div className="">
        <h5>瀏覽全部</h5>
      </div>
    </div>
  )
}
