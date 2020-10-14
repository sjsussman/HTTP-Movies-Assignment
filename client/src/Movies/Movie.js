import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
// import UpdateMovie from "./UpdateMovie";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  // const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div
        className="update-button"
        onClick={() => push(`/update-movie/${params.id}`)}
      >
        Update
      </div>
      <div className="delete-button" onClick={handleDelete}>
        Delete
      </div>
      <div className="addMovie-button" onClick={() => push("/addMovie-form")}>
        Add Movie
      </div>
    </div>
  );
}

export default Movie;
