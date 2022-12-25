import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios"

export default function App() {

  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState("");


  function handleSearchFilm(e) {
    e.preventDefault();
    function searchFilmAPI(name) {
      return `https://api.themoviedb.org/3/search/movie?api_key=4311550313481f2eaad962246fe67c57&query=${name}`
    }
    async function getFilms() {
      await axios
        .get(searchFilmAPI(searchText))
        .then(res => setFilms(res.data.results))
    }
    getFilms();
  }


  return (
    <div className="mx-auto max-w-7xl mb-8">
      <div className="font-bold text-3xl text-center my-4">ChenMovie</div>
      <form onSubmit={handleSearchFilm} className="flex justify-center items-center mt-8 w-full mb-8" action="">
        <input
          className="flex-1 border border-black rounded-md py-2 px-4 block"
          type="text"
          placeholder="Enter film's name..."
          value={searchText}
          onChange={e => { setSearchText(e.target.value) }} />
        <button className="p-2 rounded-md bg-slate-300 ml-4 hover:opacity-50"><SearchIcon /></button>
      </form>
      {films.map((film => {
        return <FilmItem key={film.id} film={film} />
      }))}
    </div>
  )
}


function FilmItem(props) {
  const { title, release_date, overview, poster_path } = props.film;


  function changeFormatDate(date) {
    //date have format yyyy-mm-dd
    const [year, month, day] = date.split('-');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[month - 1]} ${day},${year}`
  }


  return (
    <div className="rounded-lg w-full shadow-lg mb-4 flex overflow-hidden h-40">
      <img className="w-28 h-40" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="film's poster" />
      <div className="flex-1 p-4 flex flex-col">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-gray-400 mb-4">{changeFormatDate(release_date)}</div>
        <div style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>{overview}</div>
      </div>
    </div >
  )
}
