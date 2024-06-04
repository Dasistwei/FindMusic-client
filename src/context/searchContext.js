import { useState, createContext } from 'react';
//context
export const SearchContext = createContext({})

const defaultSearchResult = {
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


export const SearchProvider = ({ children }) => {
  const [track, setTrack] = useState({})
  const [chooseTrack, setChooseTrack] = useState('');
  const [searchCount, setSearchCount] = useState('')
  return (
    <SearchContext.Provider value={{ track, setTrack, chooseTrack, setChooseTrack }}>
      {children}
    </SearchContext.Provider>
  )
}
