import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { List } from '../../components/List'
import axios from 'axios';

const api = 'https://api.unsplash.com/search/photos';
const client_id = process.env.REACT_APP_UNSPLASH_ACCESS;
export default function AlbumSearch() {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        if (search !== '') {
          const response = await axios.get(`${api}?client_id=${client_id}&page=1&query=${search}`);
          setList(response.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search]);

  useEffect(() => {
    setSearch(searchParams.get('query'));
  }, [searchParams]);

  const handleSearchKeyUp = (e) => {
    if (e.code === 'Enter') {
      // setSearch(e.target.value);
      setSearchParams({ query: e.target.value });
    }
  };
  return (
    <div>
      AlbumSearch-
      <span>{search}</span>
      <input type="text" className="form-control" defaultValue={search} onKeyUp={handleSearchKeyUp} />
      <List list={list} />
    </div>
  );
}
