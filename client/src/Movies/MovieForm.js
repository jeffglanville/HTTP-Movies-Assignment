import React, { useState, useEffect } from "react";
import axios from "axios";

// const initialMovie = {
//   id: "",
//   title: "",
//   director: "",
//   metascore: "",
//   stars: []
// };

const MovieForm = (props) => {
  console.log("getting prop", props)
  const [movie] = useState();
  const [newTitle, setNewTitle] = useState("")
  const [newDirector, setNewDirector] = useState("")
  const [newMetascore, setNewMetascore] = useState("")
  const [newStars, setNewStars] = useState([])
  // const param = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => console.log("Movie", res))
      .catch(err => console.log("Err is", err.response))
    // console.log(props.movies);
    // const updateMovie = props.movies.find((movie) => {
    //   return `${movie.id}` === props.match.params.id;
    // });

    // console.log("Movie:", updateMovie);

    // if (updateMovie) {
    //   setMovie(updateMovie);
    // }
  }, [props.match.params.id]);

  // const handleChange = (e) => {
  //   setMovie({
  //     ...movie,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      title: newTitle || movie.title,
      director: newDirector || movie.director,
      metascore: newMetascore || movie.metascore,
      stars: newStars || movie.stars
    }
    axios
      .put(`http://localhost:5000/movies/${props.match.params.id}`, updatedMovie)
      .then((res) => {
        axios.get("http://localhost:5000/api/movieList").then((res) => {
          props.setMovie(res.data);
          props.history.push(`/movies`);
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
          onChange={(e) => (
            setNewTitle(e.target.value)
          )}
        />
        <input
          type="text"
          name="name"
          placeholder="Director Name"
          onChange={(e) => (
            setNewDirector(e.target.value)
          )}
        />
        <input
          type="text"
          name="name"
          placeholder="Metascore"
          onChange={(e) => (
            setNewMetascore(e.target.value)
          )}
        />
        <input
          type="text"
          name="name"
          placeholder="Stars of the movie"
          onChange={(e) => (
            setNewStars(e.target.value)
          )}
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