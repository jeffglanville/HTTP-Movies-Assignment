import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ match, history, addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${match.params.id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleDelete = e => {
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => {
        history.push("/")
      })
      .catch(err => console.log("Err is", err))
  }

  const saveMovie = () => {
    const addToSavedList = addToSavedList;
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} fetchMovie={fetchMovie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={() => history.push(`/edit-movie/${movie.id}`)}>
        Edit
      </div>
      <div className="delete-button" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
