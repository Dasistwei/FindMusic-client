const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

const spotifyApi = {

  getAccessToken: () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=` + CLIENT_ID + `&client_secret=` + CLIENT_SECRET
    };

    return fetch(process.env.REACT_APP_SPOTIFY_GET_TOKEN_URL, requestOptions)
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
  }
}
export { spotifyApi }