import React, { useState, useEffect, useContext, useRef } from 'react'
import { SearchContext } from '../context/searchContext'
import { AudDApi } from '../Api/AudDApi';
import { RecorderApi } from '../Api/Recorder';
import { useNavigate } from 'react-router-dom'
import '../assets/index.css'

const result = {
  "status": "success",
  "result": {
    "artist": "Tears For Fears",
    "title": "Everybody Wants To Rule The World",
    "album": "Songs From The Big Chair",
    "release_date": "2014-11-10",
    "label": "UMC (Universal Music Catalogue)",
    "timecode": "00:56",
    "song_link": "https://lis.tn/NbkVb",
    "spotify": {
      "album": {
        "name": "Songs From The Big Chair (Super Deluxe Edition)",
        "artists": [
          {
            "name": "Tears For Fears",
            "id": "4bthk9UfsYUYdcFyqxmSUU",
            "uri": "spotify:artist:4bthk9UfsYUYdcFyqxmSUU",
            "href": "https://api.spotify.com/v1/artists/4bthk9UfsYUYdcFyqxmSUU",
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4bthk9UfsYUYdcFyqxmSUU"
            }
          }
        ],
        "album_group": "",
        "album_type": "album",
        "id": "3myPwaMYjdwhtq0nFgeG6W",
        "uri": "spotify:album:3myPwaMYjdwhtq0nFgeG6W",
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
        "href": "https://api.spotify.com/v1/albums/3myPwaMYjdwhtq0nFgeG6W",
        "images": [
          {
            "height": 640,
            "width": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b27322463d6939fec9e17b2a6235"
          },
          {
            "height": 300,
            "width": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e0222463d6939fec9e17b2a6235"
          },
          {
            "height": 64,
            "width": 64,
            "url": "https://i.scdn.co/image/ab67616d0000485122463d6939fec9e17b2a6235"
          }
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/3myPwaMYjdwhtq0nFgeG6W"
        },
        "release_date": "1985-02-25",
        "release_date_precision": "day"
      },
      "external_ids": {
        "isrc": "GBUM71403885"
      },
      "popularity": 31,
      "is_playable": null,
      "linked_from": null,
      "artists": [
        {
          "name": "Tears For Fears",
          "id": "4bthk9UfsYUYdcFyqxmSUU",
          "uri": "spotify:artist:4bthk9UfsYUYdcFyqxmSUU",
          "href": "https://api.spotify.com/v1/artists/4bthk9UfsYUYdcFyqxmSUU",
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/4bthk9UfsYUYdcFyqxmSUU"
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
      "disc_number": 4,
      "duration_ms": 261022,
      "explicit": false,
      "external_urls": {
        "spotify": "https://open.spotify.com/track/5B9qVIyjqeWkeOAp2tJgqL"
      },
      "href": "https://api.spotify.com/v1/tracks/5B9qVIyjqeWkeOAp2tJgqL",
      "id": "5B9qVIyjqeWkeOAp2tJgqL",
      "name": "Everybody Wants To Rule The World - Alternative Single Version",
      "preview_url": "",
      "track_number": 14,
      "uri": "spotify:track:5B9qVIyjqeWkeOAp2tJgqL"
    }
  }
}

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

export const SoundsSearch = () => {
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState(null)

  const mediaRecorder = useRef(null) //new MediaRecorder() object
  const [recordingStatus, setRecordingStatus] = useState("inactive")
  const [audioChunks, setAudioChunks] = useState([]) //chunks
  const [audio, setAudio] = useState(null)  //blob:URL

  const [soundsSearchState, setsoundsSearchState] = useState('')

  const mimeType = "audio/mp3"


  const { track, setTrack } = useContext(SearchContext)
  const navigate = useNavigate()
  console.log('soundsSearchState', soundsSearchState)
  useEffect(() => {
    if (!audio) return
    setsoundsSearchState('正在搜尋歌曲...')
    AudDApi.soundsSearch(audio)
      .then(res => res.json())
      .then(res => {
        console.log('api', res)
        if (res.result && res.status === 'success') {
          setTrack(filterTrack(res.result.spotify))
          navigate(`/track/${res.result.spotify.uri}`)
        }
        setsoundsSearchState('找到了')
      })
      .catch(err => {
        console.log(err)
        setsoundsSearchState('搜尋失敗')
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
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      RecorderApi.getAudioUrl(setAudio, audioBlob)
      setAudioChunks([])
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className="border">
        <div className="mic-div border">
          <button type='button' className='mic-btn border-0 rounded-circle'>
            <span className="mic-size material-symbols-outlined text-primary " >
              mic
            </span>
          </button>
        </div>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermissions} type='button'>Get Microphone</button>
          ) : null}
          {permission && recordingStatus === 'inactive' ? (
            <button onClick={startRecording} type='button'>Start Recording</button>
          ) : null}
          {permission && recordingStatus === 'recording' ? (
            <button onClick={stopRecording} type='button'>Stop Recording</button>
          ) : null}
        </div>
        {/* {audio ? (
        <div className="audio-container">
          <audio src={audio} controls></audio>
        </div>
      ) : null} */}
      </div>
    </div>
  )
}
