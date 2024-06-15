import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { List } from '../../components/List'
const api = 'https://api.unsplash.com/search/photos';
const client_id = process.env.REACT_APP_UNSPLASH_ACCESS;

export default function AlbumLayout() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const query = 'animal';
        const response = await axios.get(`${api}?client_id=${client_id}&page=1&query=${query}`);
        setList(response.data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-4 ">
        左邊選單
        <p>
          <Link to="search">搜尋頁面</Link>
        </p>
        <List list={list} />
      </div>
      <div className="col-8">
        <Outlet context={list} />
      </div>
    </div>
  );
}
