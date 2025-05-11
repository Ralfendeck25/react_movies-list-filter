import React, { useState, useEffect, useMemo } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { debounce } from 'lodash';

export type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const trimmedQuery = query.trim();

  // Filtro memoizado para melhor performance
  const visibleMovies = useMemo(() => {
    if (!trimmedQuery) {
      return moviesFromServer;
    }

    return moviesFromServer.filter(
      movie =>
        movie.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(trimmedQuery.toLowerCase()),
    );
  }, [trimmedQuery]);

  // Debounce para evitar muitas renderizações durante digitação
  const debouncedHandleSearch = debounce((searchValue: string) => {
    setQuery(searchValue);
    setIsSearching(false);
  }, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setIsSearching(true);
    debouncedHandleSearch(inputValue);
  };

  // Limpar o debounce quando o componente desmontar
  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [debouncedHandleSearch]);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control has-icons-right">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={handleInputChange}
              />
              {isSearching && (
                <span className="icon is-small is-right">
                  <i className="fas fa-spinner fa-pulse" />
                </span>
              )}
            </div>
            {query !== trimmedQuery && (
              <p className="help">Spaces at the beginning/end will be ignored in search</p>
            )}
          </div>
        </div>

        {visibleMovies.length === 0 ? (
          <div className="notification is-warning">
            No movies found matching your search criteria
          </div>
        ) : (
          <MoviesList movies={visibleMovies} />
        )}
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
