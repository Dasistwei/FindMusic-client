import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CollectionApi } from '../../Api/CollectionApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { SearchContext } from '../../context/authContext'
import { AuthContext } from "../../context/authContext"

export default function CollectionList() {
  const [name, setName] = useState('');
  const [collectionList, setCollectionList] = useState([]);
  // const { setUserToken, userToken } = useContext(AuthContext)
  const userToken = LocalStorage.getAuthToken()

  useEffect(() => {
    CollectionApi.getCollections(userToken)
      .then((response) => response.json())
      .then((result) => {
        setCollectionList(result.data)
      })
      .catch((error) => console.error(error));
  }, [])

  const handleBtnClick = () => {
    if (name === '') return alert('歌單名不可為空')

    CollectionApi.addCollection(userToken, name)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  const handleInputChange = (e) => {
    setName(e.target.value)
  }
  collectionList && (collectionList.map((collection) => {
    console.log(collection.name)
  }))

  return (
    <>
      <div>Collection</div>
      <div className="">
        <div className="row g-3">
          <div className="col-auto">
            <input type="text" className="form-control" placeholder="請輸入歌單名稱" onChange={handleInputChange} />
          </div>
          <div className="col-auto">
            <button className='btn btn-success mb-3' onClick={handleBtnClick}>新增歌單</button>
          </div>
        </div>
      </div>
      {collectionList && (
        <ul className='list-unstyled border'>
          {collectionList.map((collection) => {
            return (
              <li key={collection._id}>
                <Link to={`/collection/${collection._id}`}>{collection.name}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  )
}
