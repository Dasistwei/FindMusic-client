import React, { useState, useEffect, useContext } from 'react';

import { SearchContext } from '../../context/searchContext'

import { spotifyApi } from '../../Api/spotifyApi';
import { Container, Form } from 'react-bootstrap';
import { TrackSearchResults } from '../../components/track/TrackSearchResults';

export default function Search() {
  const [search, setSearch] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setTrack } = useContext(SearchContext)
  useEffect(() => {
    spotifyApi.getAccessToken()
      .then(res => res.json())
      .then(result => setAccessToken(result.access_token))
      .catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    // cancel old requrest when another new search is made
    let cancel = false;
    spotifyApi.searchTracks(accessToken, search).then(response => response.json())
      .then(res => {
        //stop old requrest continueing when cancel is true
        if (cancel) return;
        setSearchResults(
          res.tracks.items.map((track) => {
            const smallestAlbum = track.album.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }, track.album.images[0]);
            return {
              artists: track.artists[0].name,
              artistsUri: track.artists[0].uri,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbum.url,
              preview_url: track.preview_url,
            };
          })
        );
      })
      .catch((error) => console.error(error));
    //trigger cancel when another requrest is made
    return () => (cancel = true);

    //輸入新的搜尋字詞 觸發新的effect，上一個effect 觸發cancel= true 停止上一個api運作
  }, [search, accessToken]);
  return (
    <>
      <Container className="p-2 border d-flex flex-column" style={{ height: '90vh' }}>
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
          {searchResults.map((track) => {
            return <TrackSearchResults track={track} key={track.uri} setTrack={setTrack} url={track.preview_url} />;
          })}
        </div>
      </Container>
    </>
  );
}
