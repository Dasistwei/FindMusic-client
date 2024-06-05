const RecorderApi = {
  getAudioUrl: (setAudio, blob) => {
    // 上传到服务器
    const formData = new FormData();
    formData.append('audio', blob, 'recording.mp3');
    fetch(`${process.env.REACT_APP_SERVER_URL}/upload/sounds`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => setAudio(data.fileUrl))
      .catch(err => console.log(err))
  },
}
export { RecorderApi }