const CommonFunc = {
  // 從 localStorage 讀取 token
  mappingToMusicsArray: (datas) => {
    const type = Object.entries(datas)[0][0]
    const values = Object.values(datas)[0].items

    return values.map((track) => {
      const images = (type === 'tracks') ? track.album.images :
        (type === 'albums') ? track.images :
          (() => { throw new Error(`Unsupported type: ${type}`) })();
      const descendAlbum = images.sort((a, b) => {
        return b.height - a.height
      });
      const choosedAlbum = (type === 'tracks') ? descendAlbum.pop() :
        (type === 'albums') && descendAlbum[0];
      // const smallestAlbum = descendAlbum.pop()
      // const smallestAlbum = descendAlbum[0]
      return {
        artists: track.artists[0].name,
        artistsUri: track.artists[0].uri,
        title: track.name,
        uri: track.uri,
        albumUrl: choosedAlbum.url,
        preview_url: track.preview_url,
      };
    })
  }
}
export { CommonFunc }