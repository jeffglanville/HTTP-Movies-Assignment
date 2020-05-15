import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const MovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    console.log(props.movies);
    const updateMovie = props.movies.find((movie) => {
      return `${movie.id}` === props.match.params.id;
    });

    console.log("Movie:", updateMovie);

    if (updateMovie) {
      setMovie(updateMovie);
    }
  }, [props.movies, props.match.params.id]);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/movies/${props.movie.id}`, movie)
      .then((res) => {
        axios.get("http://localhost:5000/api/movies").then((res) => {
          props.setMovie(res.data);
          props.history.push(`/movies/${props.movie.id}`);
        });
      })
      .catch((err) => console.log("Error is: ", err));
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Movie Title"
          value={props.movies.title}
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Director Name"
          value={props.movies.director}
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Metascore"
          value={props.movies.metascore}
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Stars of the movie"
          value={props.movies.stars}
        />
      </form>
      <button
        onClick={() => props.history.push(`/update-movie/${props.movies.id}`)}
      >
        Update and Add
      </button>
    </div>
  );
};

export default MovieForm;