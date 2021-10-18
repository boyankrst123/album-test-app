import React, { useEffect, useState } from 'react';

import logo from './album.png';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);
function App() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [album, setAlbum] = useState([]);

  // get all unique ID from json, so all albums can be displayed
  const key = 'albumId';
  const arrayUniqueByKey = [...new Map(items.map(album =>
  [album[key], album])).values()];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      )
    }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  return ( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
                <Link to="/users">
                  <div className='row m-3'>
                    { arrayUniqueByKey.map(album => (
                    <Card className='album'  
                      key={album.id}
                    >
                      <Card.Body 
                        onClick={() => 
                          setAlbum(album.albumId)
                        }>
                        <Card.Title className='h6'>
                          {album.albumId}
                        </Card.Title>
                      </Card.Body>
                    </Card> 
                    ))} 
                  </div>
                </Link>
                <Link to="/favourites">
                  <div className='row m-3'>
                    <Card className='favourites'>
                      <Card.Body   
                        onClick={() => setAlbum(0)}
                      >
                        <Card.Title >
                          Favourites
                        </Card.Title>
                      </Card.Body>
                    </Card> 
                  </div>
                </Link>

              <Switch>
                <Route path="/favourites">
                  <Favourites selectedAlbum={album}/>
                </Route>
                <Route path="/users">
                  <Users selectedAlbum={album}/>
                </Route>
              </Switch>
            </header>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

function Favourites(selectedAlbum) {
  return <Counter album={selectedAlbum} />;
}

function Users(selectedAlbum) {
  return <Counter album={selectedAlbum}  />
}

export default App;
