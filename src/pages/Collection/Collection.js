import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CollectionApi } from '../../Api/CollectionApi';
// import { LocalStorage } from "../../utils/LocalStorage";
import { LocalStorage } from "../../utils/LocalStorage";
// import { SearchContext } from '../../context/searchContext'

export default function Collection() {
  const collectionId = window.location.href.split('/collection/').pop()
  const userToken = LocalStorage.getAuthToken()
  // console.log('userToken', userToken)
  useEffect(() => {
    CollectionApi.getCollection(userToken, collectionId)
  }, [])
  return (
    <>
      <div>Collection</div>
      {/* {tracks&&( {likeList.map((track) => {
        return <Track track={track} key={track.uri} setTrack={setTrack} url={track.preview_url} />
      })})} */}
    </>
  )
}
