import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = props => {

  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  })

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setMovie(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [props.match.params.id])

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push("/movies");
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input 
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
        />
        <input 
          type="text"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input 
          type="text"
          name="stars"
          placeholder="Stars"
          value={movie.stars}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default UpdateMovie;