// {
//   "artists": "Tiësto",
//   "artistsUri": "spotify:artist:2o5jDhtHVPhrJdv3cEQ99Z",
//   "title": "My City (feat. Katy Tiz)",
//   "uri": "spotify:album:3xNEWVkFaNdnAPmC0M5J0c",
//   "albumUrl": "https://i.scdn.co/image/ab67616d0000b273fa74a2bcfa786ab6a65a0161"
// }
const CommonFunc = {
  mappingToMusicsArray: (datas, type) => {
    // console.log('datas', datas)
    // const type = Object.entries(datas)[0][0] || type
    const values = Object.values(datas)[0].items || datas
    // console.log('values', values)
    return values.map((value) => {
      const track = (type === 'home') ? value.track : value
      // console.log('track', track)
      const images = track.album.images ||
        (() => { throw new Error(`Unsupported type: ${type}`) })();



      // const descendAlbum = images.sort((a, b) => {
      //   return b.height - a.height
      // });

      // const choosedAlbum = (type === 'tracks') ? descendAlbum.pop() :
      // const choosedAlbum = (type === 'tracks') ? descendAlbum[0] :
      //   (type === 'home') && descendAlbum[0];
      const choosedAlbum = images[0]
      return {
        artists: track.artists[0].name,
        artistsUri: track.artists[0].uri,
        title: track.name,
        uri: track.uri,
        albumUrl: choosedAlbum.url,
        preview_url: track.preview_url,
      }

    })
  }
}
export { CommonFunc }
