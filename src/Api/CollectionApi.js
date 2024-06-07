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
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    // const requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow"
    // };

    // return fetch(`${process.env.REACT_APP_SERVER_URL}/collection`, requestOptions)
    console.log('get collection')
  },
  addTrack: (jwt_token, trackId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      trackId,
      "collectionId": "6661e38725715e04b9ddec70"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/collections/add_track`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}
export { CollectionApi }