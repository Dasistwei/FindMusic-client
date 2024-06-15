import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// 外部套件
import './assets/App.css';
import './assets/all.scss';
import Input from './components/input';
import { Player } from './components/track/Player';

import { SignUp, SignIn } from './pages/User';

import { ProtectedRoutes } from './pages/Other/ProtectedRoutes';

import Navbar from './components/Navbar';
import PhoneNavbar from './components/PhoneNavbar';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Other';
import { NotFound } from './pages/Other';
import {
  AlbumLayout,
  AlbumIndex,
  AlbumPhoto,
  AlbumSearch,
} from './pages/Album';
import { Artist, Track } from './pages/Music';

import { Search, SoundsSearch } from './pages/Search';

import { Collection, CollectionList } from './pages/Collection';

import { LikeList } from './pages/LikeList';
import { User } from './pages/User/User';

import { AuthContext } from "./context/authContext"

// redux
import { Counter } from "./features/counter/Counter";

//swiper
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
function App() {
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext)
  let lightMode = false
  const lightModeBorder = lightMode ? 'border' : '';
  const backgroundColor = 'bg-darkmode-main'
  const backgroundSide = 'bg-darkmode-side'
  const mainTextColor = lightMode ? 'text-secondary' : 'text-secondary';
  const secondTextColor = lightMode ? 'text-darkmode-secondary' : 'text-white';
  return (
    <div className={`App container-fluid fw-bold ${backgroundColor} ${mainTextColor}`}>
      <div className="main-content row flex-grow-1">
        <div className={`d-none d-md-block  col-md-2 position-relative fs-5 ${lightModeBorder} navbar-container ${backgroundSide} border-end border-2 border-dark`}>
          <div className="position-absolute p-center">
            <Navbar />
          </div>
        </div>
        <div className={`col-md-10 ${lightModeBorder} container content-container`} style={{ height: "80vh" }}>
          <Routes>
            <Route path="/sign_in" element={<SignIn />}></Route>
            <Route path="/sign_up" element={<SignUp />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />}></Route> {/* <Counter /> */}
              <Route path="/search" element={<Search />}></Route>
              <Route path="/sounds_search" element={<SoundsSearch />}></Route>
              <Route path="/collection" element={<CollectionList />}>
                {/* <Route path=":id" element={<Collection />}></Route> */}
              </Route>
              <Route path="collection/:id" element={<Collection />}></Route>
              <Route path="/likeList" element={<LikeList />}></Route>

              <Route path="/user" element={<User />}></Route>

              <Route path="/sign_out" ></Route>

              <Route path="/album" element={<AlbumLayout />}>
                <Route index element={<AlbumIndex />}></Route>
                <Route path="search" element={<AlbumSearch />}></Route>
                <Route path=":id" element={<AlbumPhoto />}></Route>
              </Route>
              <Route path='/artist/:id' element={<Artist />}></Route>
              <Route path='/track/:id' element={<Track />}></Route>
            </Route>
            {/* page NotFound */}
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
      <div className={`row fixed-bottom ${backgroundSide}`}>
        {isAuthenticate && (
          <div className={`col-12 bottom-0 ${lightModeBorder} border-top border-2 border-dark`}>
            <Player />
          </div>
        )}
        <div className="d-block d-md-none bottom-0 col-12 border-top border-2 border-dark">
          <PhoneNavbar />
        </div>
      </div>
    </div>
  );
}

export default App;