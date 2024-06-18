import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CollectionApi } from '../../Api/CollectionApi';
import { LocalStorage } from "../../utils/LocalStorage";
import { SearchContext } from '../../context/authContext'
import { AuthContext } from "../../context/authContext"

export default function CollectionList() {

  const [name, setName] = useState('');

  const [editInputs, setEditInputs] = useState({})

  const [collectionList, setCollectionList] = useState([]);

  const userToken = LocalStorage.getAuthToken()

  let lightMode = false
  const mainTextColor = lightMode ? 'text-secondary' : 'text-secondary';
  const secondTextColor = lightMode ? 'text-darkmode-secondary' : 'text-white';
  const backgroundColor = lightMode ? 'bg-light' : 'bg-darkmode-main';


  useEffect(() => {
    CollectionApi.getCollections(userToken)
      .then((response) => response.json())
      .then((result) => {
        setCollectionList(result.data)
        const initInputs = result.data.reduce((acc, collection) => {
          acc[collection._id] = { isEdit: false, name: collection.name }
          return acc
        }, {})
        setEditInputs(initInputs)
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

    CollectionApi.editCollection(userToken, editInputs[id].name, id)
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
  const handleEditInputChange = (e, id) => {
    setEditInputs((prevEditValues => ({
      ...prevEditValues,
      [id]: { ...prevEditValues[id], name: e.target.value }
    })))
  }
  return (
    <>
      <div className="p-3">
        <div className="row g-3">
          <div className="col-auto">
            <input type="text" className="form-control" placeholder="請輸入歌單名稱" onChange={handleInputChange} />
          </div>
          <div className="col-auto">
            <button className='btn btn-primary mb-3 text-white' onClick={handleBtnClick}>新增歌單</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`d-flex flex-column col-12 ${secondTextColor}`}>
          <table className={`${backgroundColor}`}>
            <thead>
              <tr className=''>
                <th scope="col">#</th>
                <th scope="col">名稱</th>
                <th scope="col">修改</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {collectionList && collectionList.map((collection, index) => {
                return (
                  <tr key={collection._id} className='m-2'>
                    <th scope="row p-2">{index + 1}</th>
                    <td className='p-2'>
                      {!editInputs[collection._id].isEdit ?
                        <Link className='text-decoration-none text-white' to={`/collection/${collection._id}`}>{collection.name}</Link> :
                        <input className={`p-2 rounded ${backgroundColor} text-white border-white`} type="text" value={editInputs[collection._id].name} onChange={(e) => handleEditInputChange(e, collection._id)} />
                      }
                    </td>
                    <td className='p-2'>
                      {!editInputs[collection._id].isEdit ?
                        <>
                          <button onClick={() => {
                            setEditInputs((prevEditValues => ({
                              ...prevEditValues,
                              [collection._id]: { ...prevEditValues[collection._id], isEdit: !prevEditValues[collection._id].isEdit }
                            })))
                          }}
                            className='btn btn-outline-info me-4'
                          >編輯</button>
                          <button
                            onClick={() => handleDeleteBtnClick(collection._id)}
                            className='btn btn-outline-danger'
                          >刪除</button>
                        </>

                        :
                        <>
                          <button
                            className='btn btn-outline-info me-4'
                            onClick={() => handleEditBtnClick(collection._id)}
                          >確定修改</button>
                          <button
                            className='btn btn-outline-warning me-4'
                            onClick={() => {
                              setEditInputs((prevEditValues => ({
                                ...prevEditValues,
                                [collection._id]: { ...prevEditValues[collection._id], isEdit: !prevEditValues[collection._id].isEdit, name: collection.name }
                              })))
                            }}
                          >取消</button>
                        </>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
