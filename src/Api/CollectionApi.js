const CollectionApi = {
  addCollection: (jwt_token, name) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections`, requestOptions)
  },
  getCollections: (jwt_token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections`, requestOptions)
  },
  getCollection: (jwt_token, collectionId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections/${collectionId}`, requestOptions)
  },

  editCollection: (jwt_token, name, collectionId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections/${collectionId}`, requestOptions)
  },
  deleteCollection: (jwt_token, collectionId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    const raw = "";

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections/${collectionId}`, requestOptions)
  },

  addTrack: (jwt_token, trackId, collectionId, track) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      track,
      trackId,
      collectionId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections/add_track`, requestOptions)
  },
  removeTrack: (jwt_token, trackId, collectionId) => {
    console.log('jwt_token, trackId, collectionId', jwt_token, trackId, collectionId)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      trackId,
      collectionId
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections/remove_track`, requestOptions)
  }
}
export { CollectionApi }