const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const GET_TOKEN_URL = process.env.REACT_APP_SPOTIFY_GET_TOKEN_URL

const fields = "?fields=tracks.items(track(artists(uri),name,uri,album(images),preview_url))\n"
const spotifyApi = {

  getAccessToken: () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=` + CLIENT_ID + `&client_secret=` + CLIENT_SECRET
    };

    return fetch(GET_TOKEN_URL, requestOptions)
      .then(res => res.json())
  },

  searchTracks: (accessToken, search) => {
    const searchParmas = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }

    return fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, searchParmas)
      .then(res => res.json())
  },
  getTracks: (accessToken, ids) => {
    // const searchParmas = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // }

    // return fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, searchParmas)
    //   .then(res => res.json())

    const searchParmas = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    return fetch(`https://api.spotify.com/v1/tracks?ids=${ids}`, searchParmas)
      .then((response) => response.json())
  },
  getNewReleases: (accessToken, search) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    return fetch("https://api.spotify.com/v1/browse/new-releases?limit=10", requestOptions)
      .then((res) => res.json())
  },
  getGlobalTopTracks: (accessToken) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    return fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF${fields}`, requestOptions)
      .then((response) => response.json())
  }
}
export { spotifyApi }