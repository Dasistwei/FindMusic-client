const TrackApi = {
  userLike: (jwt_token, track, trackId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      artists: track.artists,
      artistsUri: track.artistsUri,
      title: track.title,
      uri: track.uri,
      albumUrl: track.albumUrl,
      preview_url: track.preview_url
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/${trackId}/likes`, requestOptions)
  },
  userRemoveLike: (jwt_token, trackId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    const raw = "";

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/${trackId}/likes`, requestOptions)
  },
  getLikeList: (jwt_token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    return fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/getLikeList`, requestOptions)

  },
  getRecentSearch: (jwt_token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/recentSearch`, requestOptions)
      .then((response) => response.json())

  },
  addRecentSearch: (jwt_token, trackId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt_token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      trackId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    return fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/recentSearch`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error));

  },
}
export { TrackApi }