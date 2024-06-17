import React, { useState, useEffect, useContext } from 'react';

import { SearchContext } from '../../context/searchContext'

import { spotifyApi } from '../../Api/spotifyApi';
import { Container, Form } from 'react-bootstrap';
import { TrackSearchResults } from '../../components/track/TrackSearchResults';
import { CommonFunc } from '../../utils/CommonFunc';
export default function Search() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setTrack, accessToken } = useContext(SearchContext)

  useEffect(() => {
    if (!search) return;
    if (!accessToken) return;
    // cancel old requrest when another new search is made
    let cancel = false;
    spotifyApi.searchTracks(accessToken, search)
      .then(res => {
        //stop old requrest continueing when cancel is true
        if (cancel) return;
        setSearchResults(
          // CommonFunc.mappingToMusicsArray(res.tracks.items)
          CommonFunc.mappingToMusicsArray(res, 'tracks')
        );
      })
      .catch((error) => console.error(error));
    //trigger cancel when another requrest is made
    return () => (cancel = true);

    //輸入新的搜尋字詞 觸發新的effect，上一個effect 觸發cancel= true 停止上一個api運作
  }, [search, accessToken]);
  return (
    <>
      <Container className="p-2 d-flex flex-column" style={{ height: '90vh' }}>
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log(search)
            }
          }}
        ></Form.Control>
        <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
          {searchResults && searchResults.map((track) => {
            return <TrackSearchResults key={track.uri} track={track} setTrack={setTrack} />;
          })}
        </div>
      </Container>
    </>
  );
}
