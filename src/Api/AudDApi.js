const AudDApi = {
  soundsSearch: (fileUrl) => {
    //fetch AudD
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("api_token", process.env.REACT_APP_AUDD_ID);
    urlencoded.append("url", fileUrl);
    urlencoded.append("return", "spotify");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    return fetch(process.env.REACT_APP_AUDD_URL, requestOptions)
  }
}
export { AudDApi }