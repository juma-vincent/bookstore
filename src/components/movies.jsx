import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (count) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(count);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state; //Destructuring

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id) //movies array filtering when genre is selected
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      sortColumn.path,
      sortColumn.order
    ); // sorted filtered movies

    const movies = paginate(sortedMovies, currentPage, pageSize); // pagiated movies array

    return { totalCount: filteredMovies.length, movies: movies };
  };

  render() {
    const { currentPage, pageSize, sortColumn } = this.state; //Destructuring

    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const { totalCount, movies } = this.getPagedData();

    return (
      <div className="row" style={{ marginLeft: 50, marginRight: 50 }}>
        <div className="pt-2 col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className=" ml-2 col">
          <Link className="btn btn-primary mt-2 mb-4" to="/movies/new">
            New Movie
          </Link>

          <p className="ml-2">Showing {totalCount} movies in the database.</p>

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
