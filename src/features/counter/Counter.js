import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToFavourites, resetFavourites } from './counterSlice';
import styles from './Counter.module.css';
import { Card, Button} from 'react-bootstrap';
import { store } from '../../app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function Counter(props) {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const favouritesIDs =  store.getState().counter.value

  const filterResults = (items) => {
    // show favourite pictures
    if (props.album.selectedAlbum === 0) {
      return items.filter(picture => favouritesIDs.includes(picture.id));
     }
    // show pictures according to their album number
    else {
      const picturesByAlbum = items.filter(picture => picture.albumId === props.album.selectedAlbum);
      return picturesByAlbum;
    }
  };

  const imageResults = filterResults(items);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  // loading message is displayed untill the some results are fetched 
  else if (!isLoaded) {
    return (
    <div className="row">
        <div>Loading albums ...</div>
    </div>
    );
  }
  else {
    return (
    <div className='row d-flex justify-content-center'>
      {/* TODO : hide reset button when no favourites added */}
        <Button
            className={styles.button}
            onClick={() => dispatch(resetFavourites())}
          >Reset Favourites
        </Button> 
          {/* Render results */}
          { imageResults.map(image => (
            <Card className='m-4 mb-5 rounded picture'
            key={image.id} 
            style={{backgroundImage: 'url(' + image.thumbnailUrl + ')'}}
            >
              <Button
                className= {'fa fa-heart' + ' ' + styles.favouritesButton} 
                onClick={() => dispatch(addToFavourites(image.id))}
                />
              <Card.Body >
                <Card.Text  className={styles.albumInfo}>
                  {image.id}
                </Card.Text>
                <Card.Title className={styles.textInfo}>
                  {image.title}
                </Card.Title>
              </Card.Body>
            </Card> 
          ))}
      </div>
      );
    }
}
