import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = 'https://api.unsplash.com/photos';
const client_id = process.env.REACT_APP_UNSPLASH_ACCESS;
export default function AlbumPhoto() {
  const { id } = useParams();
  const [photo, setPhoto] = useState({});
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${api}/${id}?client_id=${client_id}`);
        setPhoto(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);


  return (
    <div>
      <button type='button' onClick={() => { navigate(-1) }}>上一頁</button>
      <div className="">
        <p>{photo.description}</p>
        <img src={photo?.urls?.small} className="imag-fluid" alt="album-pic" />
      </div>
    </div>
  );
}
