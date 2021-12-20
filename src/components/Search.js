import React, { useState, useEffect } from "react";
import Carditem from "./Carditem";
import "../App.css";
import Page from "./Page";
import Loading from "./Loading";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({apiKey}) => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpage, setTotalpage] = useState(1);
  const [type, setType] = useState()
  const [query, setQuery] = useState(" ")
  const fetchData = async () => {
    setLoading(true);
    const searchFetch = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await searchFetch.json();
    setMovie(data.results);
    setTotalpage(data.total_pages);
    setLoading(false);
  };
  return (
    <>
      <div className="center">
        <TextField
          id="outlined-basic"
          label="Search"
          color="grey"
          variant="outlined"
          onChange={(event) => {
            setQuery(event.target.value);
            fetchData()
          }}
        />
        <SearchIcon sx={{ fontSize: 40, marginLeft : "5px", marginTop : "5px", cursor : "pointer" }} onClick = {fetchData} />

      </div>
      <Page setPage={setPage} total={totalpage} />
      {loading ? <Loading /> : " "}
      <div className="carddiv">
        {movie &&
          movie.map((element) => {
              return (
                <Carditem
                  element={element}
                  id={element.id}
                  type={element.media_type}
                  page={page}
                  key={element.id}
                />
              );
            })}
      </div>
      <Page setPage={setPage} total={totalpage} />
    </>
  );
};

export default Search;
