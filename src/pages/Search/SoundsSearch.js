import React, { useState, useEffect, useContext, useRef } from 'react'
import { SearchContext } from '../../context/searchContext'
import { AudDApi } from '../../Api/AudDApi';
import { RecorderApi } from '../../Api/Recorder';
import { LocalStorage } from '../../utils/LocalStorage';
import { CommonFunc } from '../../utils/CommonFunc';
import { useNavigate } from 'react-router-dom'
import '../../assets/index.css'

const re = {
  "album": {
    "name": "잘자요 아가씨",
    "artists": [
      {
        "name": "ASMRZ",
        "id": "660U1sbp7uNWcb2BYcQHAK",
        "uri": "spotify:artist:660U1sbp7uNWcb2BYcQHAK",
        "href": "https://api.spotify.com/v1/artists/660U1sbp7uNWcb2BYcQHAK",
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/660U1sbp7uNWcb2BYcQHAK"
        }
      }
    ],
    "album_group": "",
    "album_type": "single",
    "id": "6OaL36lNTWHPlFA9Y8bql3",
    "uri": "spotify:album:6OaL36lNTWHPlFA9Y8bql3",
    "available_markets": [
      "AR",
      "AU",
      "AT",
      "BE",
      "BO",
      "BR",
      "BG",
      "CA",
      "CL",
      "CO",
      "CR",
      "CY",
      "CZ",
      "DK",
      "DO",
      "DE",
      "EC",
      "EE",
      "SV",
      "FI",
      "FR",
      "GR",
      "GT",
      "HN",
      "HK",
      "HU",
      "IS",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MY",
      "MT",
      "MX",
      "NL",
      "NZ",
      "NI",
      "NO",
      "PA",
      "PY",
      "PE",
      "PH",
      "PL",
      "PT",
      "SG",
      "SK",
      "ES",
      "SE",
      "CH",
      "TW",
      "TR",
      "UY",
      "US",
      "GB",
      "AD",
      "LI",
      "MC",
      "ID",
      "JP",
      "TH",
      "VN",
      "RO",
      "IL",
      "ZA",
      "SA",
      "AE",
      "BH",
      "QA",
      "OM",
      "KW",
      "EG",
      "MA",
      "DZ",
      "TN",
      "LB",
      "JO",
      "PS",
      "IN",
      "BY",
      "KZ",
      "MD",
      "UA",
      "AL",
      "BA",
      "HR",
      "ME",
      "MK",
      "RS",
      "SI",
      "KR",
      "BD",
      "PK",
      "LK",
      "GH",
      "KE",
      "NG",
      "TZ",
      "UG",
      "AG",
      "AM",
      "BS",
      "BB",
      "BZ",
      "BT",
      "BW",
      "BF",
      "CV",
      "CW",
      "DM",
      "FJ",
      "GM",
      "GE",
      "GD",
      "GW",
      "GY",
      "HT",
      "JM",
      "KI",
      "LS",
      "LR",
      "MW",
      "MV",
      "ML",
      "MH",
      "FM",
      "NA",
      "NR",
      "NE",
      "PW",
      "PG",
      "PR",
      "WS",
      "SM",
      "ST",
      "SN",
      "SC",
      "SL",
      "SB",
      "KN",
      "LC",
      "VC",
      "SR",
      "TL",
      "TO",
      "TT",
      "TV",
      "VU",
      "AZ",
      "BN",
      "BI",
      "KH",
      "CM",
      "TD",
      "KM",
      "GQ",
      "SZ",
      "GA",
      "GN",
      "KG",
      "LA",
      "MO",
      "MR",
      "MN",
      "NP",
      "RW",
      "TG",
      "UZ",
      "ZW",
      "BJ",
      "MG",
      "MU",
      "MZ",
      "AO",
      "CI",
      "DJ",
      "ZM",
      "CD",
      "CG",
      "IQ",
      "LY",
      "TJ",
      "VE",
      "ET",
      "XK"
    ],
    "href": "https://api.spotify.com/v1/albums/6OaL36lNTWHPlFA9Y8bql3",
    "images": [
      {
        "height": 640,
        "width": 640,
        "url": "https://i.scdn.co/image/ab67616d0000b2733f476b962eb78cb7e480a299"
      },
      {
        "height": 300,
        "width": 300,
        "url": "https://i.scdn.co/image/ab67616d00001e023f476b962eb78cb7e480a299"
      },
      {
        "height": 64,
        "width": 64,
        "url": "https://i.scdn.co/image/ab67616d000048513f476b962eb78cb7e480a299"
      }
    ],
    "external_urls": {
      "spotify": "https://open.spotify.com/album/6OaL36lNTWHPlFA9Y8bql3"
    },
    "release_date": "2024-02-29",
    "release_date_precision": "day"
  },
  "external_ids": {
    "isrc": "KRF502400197"
  },
  "popularity": 57,
  "is_playable": null,
  "linked_from": null,
  "artists": [
    {
      "name": "ASMRZ",
      "id": "660U1sbp7uNWcb2BYcQHAK",
      "uri": "spotify:artist:660U1sbp7uNWcb2BYcQHAK",
      "href": "https://api.spotify.com/v1/artists/660U1sbp7uNWcb2BYcQHAK",
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/660U1sbp7uNWcb2BYcQHAK"
      }
    }
  ],
  "available_markets": [
    "AR",
    "AU",
    "AT",
    "BE",
    "BO",
    "BR",
    "BG",
    "CA",
    "CL",
    "CO",
    "CR",
    "CY",
    "CZ",
    "DK",
    "DO",
    "DE",
    "EC",
    "EE",
    "SV",
    "FI",
    "FR",
    "GR",
    "GT",
    "HN",
    "HK",
    "HU",
    "IS",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MY",
    "MT",
    "MX",
    "NL",
    "NZ",
    "NI",
    "NO",
    "PA",
    "PY",
    "PE",
    "PH",
    "PL",
    "PT",
    "SG",
    "SK",
    "ES",
    "SE",
    "CH",
    "TW",
    "TR",
    "UY",
    "US",
    "GB",
    "AD",
    "LI",
    "MC",
    "ID",
    "JP",
    "TH",
    "VN",
    "RO",
    "IL",
    "ZA",
    "SA",
    "AE",
    "BH",
    "QA",
    "OM",
    "KW",
    "EG",
    "MA",
    "DZ",
    "TN",
    "LB",
    "JO",
    "PS",
    "IN",
    "BY",
    "KZ",
    "MD",
    "UA",
    "AL",
    "BA",
    "HR",
    "ME",
    "MK",
    "RS",
    "SI",
    "KR",
    "BD",
    "PK",
    "LK",
    "GH",
    "KE",
    "NG",
    "TZ",
    "UG",
    "AG",
    "AM",
    "BS",
    "BB",
    "BZ",
    "BT",
    "BW",
    "BF",
    "CV",
    "CW",
    "DM",
    "FJ",
    "GM",
    "GE",
    "GD",
    "GW",
    "GY",
    "HT",
    "JM",
    "KI",
    "LS",
    "LR",
    "MW",
    "MV",
    "ML",
    "MH",
    "FM",
    "NA",
    "NR",
    "NE",
    "PW",
    "PG",
    "PR",
    "WS",
    "SM",
    "ST",
    "SN",
    "SC",
    "SL",
    "SB",
    "KN",
    "LC",
    "VC",
    "SR",
    "TL",
    "TO",
    "TT",
    "TV",
    "VU",
    "AZ",
    "BN",
    "BI",
    "KH",
    "CM",
    "TD",
    "KM",
    "GQ",
    "SZ",
    "GA",
    "GN",
    "KG",
    "LA",
    "MO",
    "MR",
    "MN",
    "NP",
    "RW",
    "TG",
    "UZ",
    "ZW",
    "BJ",
    "MG",
    "MU",
    "MZ",
    "AO",
    "CI",
    "DJ",
    "ZM",
    "CD",
    "CG",
    "IQ",
    "LY",
    "TJ",
    "VE",
    "ET",
    "XK"
  ],
  "disc_number": 1,
  "duration_ms": 113302,
  "explicit": false,
  "external_urls": {
    "spotify": "https://open.spotify.com/track/2JxXcCgVx61AI0MOUoXC68"
  },
  "href": "https://api.spotify.com/v1/tracks/2JxXcCgVx61AI0MOUoXC68",
  "id": "2JxXcCgVx61AI0MOUoXC68",
  "name": "잘자요 아가씨 (Prod. 과나)",
  "preview_url": "https://p.scdn.co/mp3-preview/3c8c83d2bb5a75347a0d45109a78a7dcbaaf2c39?cid=e44e7b8278114c7db211c00ea273ac69",
  "track_number": 1,
  "uri": "spotify:track:2JxXcCgVx61AI0MOUoXC68",
  "type": "track"
}
// console.log('s', CommonFunc.mappingToMusicsArray(re))

const filterTrack = (result) => {
  const smallestAlbum = result.album.images.reduce((smallest, image) => {
    if (image.height < smallest.height) return image;
    return smallest;
  }, result.album.images[0]);
  return {
    artists: result.artists[0].name,
    title: result.name,
    uri: result.uri,
    albumUrl: smallestAlbum.url,
    albumName: result.album.name,
    preview_url: result.preview_url,
  };
}

export default function SoundsSearch() {
  const userToken = LocalStorage.getAuthToken()
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState(null)

  const mediaRecorder = useRef(null) //new MediaRecorder() object
  const [recordingStatus, setRecordingStatus] = useState("inactive")
  const [audioChunks, setAudioChunks] = useState([]) //chunks
  const [audio, setAudio] = useState(null)  //blob:URL
  const [isRecognizing, setIsRecognizin] = useState(false)
  const [isRecognizingText, setIsRecognizinText] = useState('')


  const mimeType = "audio/mp3"


  const { track, setTrack } = useContext(SearchContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!audio) return
    setIsRecognizinText('正在搜尋歌曲...')
    AudDApi.soundsSearch(audio)
      .then(res => {
        // console.log('api', res)
        if (res.result === null) {
          setIsRecognizinText('搜尋失敗')
          setIsRecognizin(false)
          return
        }
        if (res.result !== null && res.status === 'success') {
          // setTrack(filterTrack(res.result.spotify))
          setTrack(CommonFunc.mappingToMusicsArray(res.result.spotify))
          navigate(`/track/${res.result.spotify.uri}`)
          setIsRecognizinText('找到了')
          setIsRecognizin(false)
          return
        }
      })
      .catch(err => {
        console.log(err)
        setIsRecognizinText('搜尋失敗')
        setIsRecognizin(false)
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
    setIsRecognizinText('')

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
    setIsRecognizin(true)
    setIsRecognizinText('正在辨識...')
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
        <div className="mic-div ">
          <button type='button' className='mic-btn border-0 rounded-circle' onClick={buttonProps.onClick} disabled={isRecognizing} >
            <span className="mic-size material-symbols-outlined text-info " >
              mic
            </span>
          </button>
          <div className="audio-controls mic-tex-m text-white fs-3">{!isRecognizing ? buttonProps.text : isRecognizingText}</div>
          <div className="text-white">{isRecognizingText === '搜尋失敗' && isRecognizingText}</div>
        </div>
      </div>
    </div>
  )
}
