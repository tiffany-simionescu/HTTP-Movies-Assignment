import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (e, id) => {
    e.preventDefault();
    // const theMovie = this.state.movie.find(movie => movie.id === id);

    if(window.confirm("Are you sure you want to delete this movie?")) (
      axios.delete(`http://localhost:5000/api/movies/${id}`, this.state)
        .then(res => {
          console.log(res, "Movie was deleted");
          // this.setState(this.state.movie.filter(movie => movie.id !== id))
          // this.setState(res.data);
          this.props.history.push("/");
        })
        .catch(err => {
          console.log(err);
          // this.setState([...this.state.movie, theMovie]);
        })
    )
    this.props.history.push("/");
    // Removes movie from list on app
    window.location.href = window.location.href
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div>
          <Link className="edit-button"
            to={`/update-movie/${this.state.movie.id}`}>Edit</Link>
          <div className="delete-button" 
            onClick={(e) => this.deleteMovie(e, this.state.movie.id)}>
            {/* onClick={this.deleteMovie}> */}
              Delete
          </div>
        </div>
        {/* <button className='edit-button' onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)}>Edit</button> */}
      </div>
    );
  }
}
