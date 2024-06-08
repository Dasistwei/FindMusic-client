import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CollectionApi } from '../../Api/CollectionApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { SearchContext } from '../../context/authContext'
import { AuthContext } from "../../context/authContext"

export default function CollectionList() {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState('');
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
      .then((result) => {
        console.log(result)
        setName('')
        window.location.reload()
      })
      .catch((error) => console.error(error));
  }
  const handleInputChange = (e) => {
    setName(e.target.value)
  }
  const handleEditBtnClick = (id) => {
    console.log(userToken, editValue, id)
    CollectionApi.editCollection(userToken, editValue, id)
      .then((response) => response.json())
      .then((result) => {
        window.location.reload()
      })
      .catch((error) => console.error(error));
  }
  const handleDeleteBtnClick = (id) => {
    CollectionApi.deleteCollection(userToken, id)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        window.location.reload()
      })
      .catch((error) => console.error(error));
  }
  const handleEditInputChange = (e) => {
    setEditValue(e.target.value)
  }
  return (
    <>
      <div className="p-3">
        <div className="row g-3">
          <div className="col-auto">
            <input type="text" className="form-control" placeholder="請輸入歌單名稱" onChange={handleInputChange} />
          </div>
          <div className="col-auto">
            <button className='btn btn-success mb-3' onClick={handleBtnClick}>新增歌單</button>
          </div>
        </div>
      </div>
      <table className="table table-light">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">名稱</th>
            <th scope="col"></th>
            <th scope="col">修改</th>
          </tr>
        </thead>
        <tbody>
          {collectionList.map((collection, index) => {
            return (
              <tr key={collection._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {!isEdit ?
                    <Link to={`/collection/${collection._id}`}>{collection.name}</Link> :
                    <input type="text" value={editValue} onChange={handleEditInputChange} />
                  }
                </td>
                <td></td>
                <td>
                  {!isEdit ?
                    <button onClick={() => {
                      setIsEdit(true)
                      setEditValue(collection.name)
                    }}>編輯</button>
                    :
                    <>
                      <button onClick={() => handleEditBtnClick(collection._id)}>確定修改</button>
                      <button onClick={() => setIsEdit(false)}>取消</button>
                    </>
                  }
                  <button onClick={() => handleDeleteBtnClick(collection._id)}>刪除</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}
