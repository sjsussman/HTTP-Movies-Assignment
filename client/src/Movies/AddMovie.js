import React, { useState } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  const changeHandler = (e) => {
    e.persist();
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Add a New Film</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />{" "}
        <br /> <br />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />{" "}
        <br /> <br />
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />{" "}
        <br /> <br />
        <input
          type="string"
          name="starOne"
          onChange={changeHandler}
          placeholder="Star One"
          value={movie.stars}
        />{" "}
        <br /> <br />
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
