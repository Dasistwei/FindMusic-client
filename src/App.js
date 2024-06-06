import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// 外部套件
import './assets/App.css';
import './assets/all.scss';
import Input from './components/input';
import { Player } from './components/track/Player';
import { SignUp } from './pages/User/SignUp';
import { SignOut } from './pages/User/SignOut';
import { SignIn } from './pages/User/SignIn';
import { ProtectedRoutes } from './pages/User/ProtectedRoutes';

import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Home, NotFound } from './pages';
import {
  AlbumLayout,
  AlbumIndex,
  AlbumPhoto,
  AlbumSearch,
} from './pages/Album';
import { Artist, Track } from './pages/Music';


import { Search } from './pages/Search';
import { SoundsSearch } from './pages/SoundsSearch';
import { Collection } from './pages/Collection';
import { LikeList } from './pages/LikeList';
import { User } from './pages/User/User';

// redux
import { Counter } from "./features/counter/Counter";

function App() {

  return (
    <div className="App bg-light">
      <div className="main-content row flex-grow-1">
        <div className="col-md-3 border navbar-container">
          <Navbar />
        </div>
        <div className="col-md-9 border container content-container">
          <Routes>
            <Route path="/sign_in" element={<SignIn />}></Route>
            <Route path="/sign_up" element={<SignUp />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />}></Route> {/* <Counter /> */}
              <Route path="/search" element={<Search />}></Route>
              <Route path="/sounds_search" element={<SoundsSearch />}></Route>
              <Route path="/collection" element={<Collection />}></Route>
              <Route path="/likeList" element={<LikeList />}></Route>

              <Route path="/user" element={<User />}></Route>

              <Route path="/sign_out" element={<SignOut />}></Route>

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
      <div className="row">
        <div className="position-absolute col-12 bottom-0 border">
          <Player />
        </div>
      </div>
    </div>
  );
}

export default App;
