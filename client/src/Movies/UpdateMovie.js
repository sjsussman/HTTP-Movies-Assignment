import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = () => {
  const [movie, setMovie] = useState(initialItem);
  const { id } = useParams();
  const { push } = useHistory();
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        //convert res.data.starts to a string here
        setMovie(res.data);
        console.log("incoming object:", res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (e) => {
    e.persist();
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };
  //call in star array -> parse it into string -> update ->convert back to array via split(,)
  const handleSubmit = (e) => {
    e.preventDefault();
    //convert res.data.starts to an array here in new object
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        setMovie(res.data);
        console.log("outgoing object:", res.data);
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err.data));
  };

  return (
    <div>
      <h2>Update Film</h2>
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
        {/* <input
          type="string"
          name="starTwo"
          onChange={changeHandler}
          placeholder="Star Two"
          value={movie.stars[1]}
        />{" "}
        <br /> <br />
        <input
          type="string"
          name="starThree"
          onChange={changeHandler}
          placeholder="Star Three"
          value={movie.stars[2]}
        />{" "} */}
        <br /> <br />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
