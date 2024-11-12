import React, { useState, useEffect, useContext, useRef } from 'react'
import { SearchContext } from '../../context/searchContext'
import { AudDApi } from '../../Api/AudDApi';
import { RecorderApi } from '../../Api/Recorder';
import { LocalStorage } from '../../utils/LocalStorage';
import { CommonFunc } from '../../utils/CommonFunc';
import { useNavigate } from 'react-router-dom'
import '../../assets/index.css'


export default function SoundsSearch() {
  const userToken = LocalStorage.getAuthToken()
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState(null)

  const mediaRecorder = useRef(null) //new MediaRecorder() object
  const micBtn = useRef(null)

  const [recordingStatus, setRecordingStatus] = useState("inactive")
  const [audioChunks, setAudioChunks] = useState([]) //chunks
  const [audio, setAudio] = useState(null)  //blob:URL
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [isRecognizingText, setIsRecognizingText] = useState('')


  const mimeType = "audio/mp3"


  const { track, setTrack } = useContext(SearchContext)
  const navigate = useNavigate()

  // console.log(micBtn.current.before)

  useEffect(() => {
    if (!audio) return
    setIsRecognizingText('正在搜尋歌曲...')
    // AudDApi.soundsSearch("https://p.scdn.co/mp3-preview/74f603e906ab7a5409cf2edc6dda326ebe7c1d49?cid=6d6c82e90319486a86b127fc46235b9e")
    AudDApi.soundsSearch(audio)
      .then(res => {
        console.log('api', res)
        if (res.result === null || res.status === "error") {
          setIsRecognizingText('搜尋失敗')
          setIsRecognizing(false)
          return
        }
        if (res.result !== null && res.status === 'success') {
          // setTrack(filterTrack(res.result.spotify))
          setTrack(CommonFunc.mappingToMusicsArray(res.result.spotify))
          navigate(`/track/${res.result.spotify.uri}`)
          setIsRecognizingText('找到了')
          setIsRecognizing(false)
          return
        }
      })
      .catch(err => {
        console.log(err)
        setIsRecognizingText('搜尋失敗')
        setIsRecognizing(false)
      })
  }, [audio])


  //取得錄音權限
  const getMicrophonePermissions = async () => {
    try {
      if (!"MediaRecorder" in window) {
        return alert("The MediaRecorder API is not supported in your browser.")
      };

      const streamData = await navigator.mediaDevices.getUserMedia({ audio: true })
      setPermission(true)
      setStream(streamData)
    } catch (error) {
      console.log(error.message)
    }
  }

  const startRecording = async () => {
    setRecordingStatus('recording')
    setIsRecognizingText('')

    //create media recorder in use of stream
    const media = new MediaRecorder(stream, { type: mimeType })
    //set media to ref
    mediaRecorder.current = media
    mediaRecorder.current.start()
    let audioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined' || event.data.size === 0) return
      audioChunks.push(event.data)
    }
    setAudioChunks(audioChunks)
  }
  const stopRecording = () => {
    setRecordingStatus("inactive")
    setIsRecognizing(true)
    setIsRecognizingText('正在辨識...')
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      RecorderApi.getAudioUrl(setAudio, audioBlob, userToken)
      setAudioChunks([])
    }
  }
  const buttonProps = !permission
    ? { onClick: getMicrophonePermissions, text: 'Press to Get Microphone...' }
    : recordingStatus === 'inactive'
      ? { onClick: startRecording, text: 'Press to Start Recording' }
      : { onClick: stopRecording, text: 'Press to Stop Recording' }


  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className="">
        <div className="mic-div d-flex position-relative flex-column">
          <button type='button' className='mic-btn border-0 rounded-circle' onClick={buttonProps.onClick} disabled={isRecognizing} ref={micBtn} >
            <span className="mic-size material-symbols-outlined text-info " >
              mic
            </span>
          </button>
          <div className={`mic-btn-animate1 position-absolute rounded-circle ${isRecognizing ? 'mic-btn-animate' : ''}`}></div>
          <div className={`mic-btn-animate2  position-absolute rounded-circle ${isRecognizing ? 'mic-btn-animate' : ''}`}></div>
          <div className="audio-controls mic-tex-m text-white fs-3">{!isRecognizing ? buttonProps.text : isRecognizingText}</div>
          <div className="text-white">{isRecognizingText === '搜尋失敗' && isRecognizingText}</div>
        </div>
      </div>
    </div>
  )
}
