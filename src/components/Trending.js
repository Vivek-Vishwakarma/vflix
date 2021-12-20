import React, { useState, useEffect } from "react";
import Carditem from "./Carditem";
import "../App.css";
import Page from "./Page";
import Loading from "./Loading";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const Trending = ({ apiKey }) => {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpage, setTotalpage] = useState(1);

  const getMovies = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`
    );
    const data = await response.json();
    setMovie(data.results);
    setTotalpage(data.total_pages);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, [page]);
  return (
    <>
    <Typography variant="h3" style = {{textAlign : "center", marginTop : "5px"}}>
        Trending Today
    </Typography>
    <div className="center">
      <TextField
      id="outlined-basic"
      label="Search"
      color="grey"
      variant="outlined"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
      <Page setPage={setPage} total={totalpage} />
      {loading ? <Loading /> : " "}
      <div className="carddiv">
        {movie &&
          movie
          // eslint-disable-next-line
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              val.original_title && val.original_title.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          })
          .map((element) => {
            return (
              <Carditem
                element={element}
                id={element.id}
                type={element.media_type}
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

export default Trending;
