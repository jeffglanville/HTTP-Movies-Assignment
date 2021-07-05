import React, { useState } from "react";
import axios from 'axios';

export const AddMovie = (props) => {
  const [newMovie, setNewMovie] = useState([]);

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/movies`, newMovie)
      .then((res) => {
        console.log("Res:", res);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewMovie({
      id: "",
      title: "",
      director: "",
      metascore: "",
      stars: [],
    });

    return (
      <div>
        <h1>Add New Movie</h1>
        <form onSubmit={submitHandler}>
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
      </div>
    );
  };
};