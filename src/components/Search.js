import React, { useState, useEffect } from "react";
import Carditem from "./Carditem";
import "../App.css";
import Page from "./Page";
import Loading from "./Loading";
import { TextField } from "@mui/material";
import Tab from "@mui/material/Tab";
import { Tabs } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Search = ({ apiKey }) => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpage, setTotalpage] = useState(1);
  const [type, setType] = useState(0);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [withgenre, setWithgenre] = useState("");
  const fetchData = async () => {
    setLoading(true);
    const searchFetch = await fetch(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=${apiKey}&query=${query}&page=${page}`
    );
    const data = await searchFetch.json();
    setMovie(data.results);
    setTotalpage(data.total_pages);
    setLoading(false);
  };
  const fetchGenre = async () => {
    setLoading(true);
    const searchFetch = await fetch(
      `https://api.themoviedb.org/3/genre/${
        type ? "tv" : "movie"
      }/list?api_key=${apiKey}`
    );
    const data = await searchFetch.json();
    setGenre(data.genres);
    setLoading(false);
  };

  const handleChange = (event) => {
    setWithgenre(event.target.value);
  };

  const fetchDataGenre = async () => {
    setLoading(true);
    const searchFetch = await fetch(
      `https://api.themoviedb.org/3/discover/${
        type ? "tv" : "movie"
      }?api_key=${apiKey}&with_genres=${withgenre}&page=${page}`
    );
    const data = await searchFetch.json();
    setMovie(data.results);
    setTotalpage(data.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchGenre();
    // eslint-disable-next-line
  }, [page, type, withgenre]);
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
          }}
        />
        <SearchIcon
          sx={{
            fontSize: 40,
            marginLeft: "5px",
            marginTop: "5px",
            cursor: "pointer",
          }}
          onClick={fetchData}
        />
      </div>
      <div className="center">
        <FormControl style={{ width: "225px" }}>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={withgenre}
            label="Genre"
            onChange={handleChange}
          >
            {genre &&
              genre.map((element) => {
                return <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>;
              })}
          </Select>
        </FormControl>
        <SearchIcon
          sx={{
            fontSize: 40,
            marginLeft: "5px",
            marginTop: "5px",
            cursor: "pointer",
          }}
          onClick={fetchDataGenre}
        />
      </div>
      <Page setPage={setPage} total={totalpage} />
      <div className="tabs">
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5, textAlign: "center" }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "150px" }} label="Movies" />
          <Tab style={{ width: "150px" }} label="TV Series" />
        </Tabs>
      </div>
      {loading ? <Loading /> : " "}
      <div className="carddiv">
        {movie &&
          movie.map((element) => {
            return (
              <Carditem
                element={element}
                id={element.id}
                type={type ? "tv" : "movie"}
                page={page}
                key={element.id}
                apiKey={apiKey}
              />
            );
          })}
      </div>
      <Page setPage={setPage} total={totalpage} />
    </>
  );
};

export default Search;
