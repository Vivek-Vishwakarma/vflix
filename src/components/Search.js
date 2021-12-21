import React, { useState, useEffect } from "react";
import Carditem from "./Carditem";
import "../App.css";
import Page from "./Page";
import Loading from "./Loading";
import { TextField } from "@mui/material";
import Tab from '@mui/material/Tab';
import {Tabs} from '@material-ui/core';
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ apiKey }) => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpage, setTotalpage] = useState(1);
  const [type, setType] = useState(0);
  const [query, setQuery] = useState("");
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
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, type]);
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
          style={{ paddingBottom: 5, textAlign : "center"}}
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
