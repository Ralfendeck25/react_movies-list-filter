import React from 'react';
import './MovieCard.scss';
import { Movie } from '../../App';

interface Props {
  movie: Movie;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const { imdbUrl, imgUrl, description, title } = movie;

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={imgUrl} alt="Film logo" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="images/imdb-logo.jpeg" alt="imdb" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-8">{title}</p>
          </div>
        </div>

        <div className="content">
          {description}
          <br />
          <a href={imdbUrl}>IMDB</a>
        </div>
      </div>
    </div>
  );
};
