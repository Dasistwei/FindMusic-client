import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { spotifyApi } from '../../Api/spotifyApi'
import { TrackApi } from '../../Api/TrackApi'
import { SearchContext } from '../../context/searchContext'
import { CommonFunc } from '../../utils/CommonFunc'
import { LocalStorage } from '../../utils/LocalStorage'

export default function Home() {
  const { setTrack, setChooseTrack, accessToken } = useContext(SearchContext)
  const userToken = LocalStorage.getAuthToken()

  const [newReleases, setNewReleases] = useState([])
  const [recentSearch, setResentSearch] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (newReleases.length > 0 || !accessToken) return

    spotifyApi.getGlobalTopTracks(accessToken)
      .then((result) => {
        setNewReleases(CommonFunc.mappingToMusicsArray(result, 'home'))
      })
      .catch((error) => console.error(error));

    TrackApi.getRecentSearch(userToken)
      .then((response) => response.data.join(','))
      .then((ids) => {
        spotifyApi.getTracks(accessToken, ids)
          .then((result) => setResentSearch(CommonFunc.mappingToMusicsArray(result.tracks)))
          .catch((error) => console.error(error));
      })
  }, [accessToken])


  // console.log('recentSearch', recentSearch)
  return (
    <div className='border vh-100 text-start '>
      <div className="">
        <h5>全球熱門歌曲</h5>
        <swiper-container className="mySwiper" effect="coverflow" grab-cursor="true" centered-slides="true"
          slides-per-view="auto" coverflow-effect-rotate="50" coverflow-effect-stretch="0" coverflow-effect-depth="100"
          coverflow-effect-modifier="1" coverflow-effect-slide-shadows="true">
          {newReleases.length > 0 && newReleases.map((album) => {
            return (
              <swiper-slide onClick={() => {
                setTrack(album);
                navigate(`/track/${album.uri}`)
              }} key={album.uri}>
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
        <h5>最近的搜尋</h5>
        <swiper-container class="mySwiper" pagination="true" pagination-clickable="true" space-between="30"
          slides-per-view="3">
          {recentSearch.length > 0 && recentSearch.map((album) => {
            return (
              <swiper-slide onClick={() => {
                setTrack(album);
                navigate(`/track/${album.uri}`)
              }} key={album.uri}>
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
    </div>
  )
}
