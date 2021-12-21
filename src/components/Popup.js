import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import { Fade } from "@mui/material";
import Modal from "@mui/material/Modal";
import "../App.css";
import Chip from "@mui/material/Chip";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  color: "white",
  bgcolor: "hsl(0, 0%, 10%);",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};
const Popup = ({ children, id, type ,apiKey }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = useState();
  const [content, setContent] = useState();
  const getVideo = async () => {
    const fetchVideo = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`
    );
    const videoData = await fetchVideo.json();
    setVideo(videoData.results[0]?.key);
  };
  const getData = async () => {
    const fetchData = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`
    );
    const contentData = await fetchData.json();
    setContent(contentData);
  };
  useEffect(() => {
    getVideo();
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Button className="carditemdiv" onClick={handleOpen}>
        {children}
      </Button>
      {content && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="muimodaldiv"
        >
          <Fade in={open}>
            <Box sx={style} className="boxModal">
              <div className="modalDiv">
                <div className="modalImage">
                  <img
                    src={`https://image.tmdb.org/t/p/w400${content.poster_path}`}
                    alt={content.original_title}
                  />
                </div>
                <div className="content">
                  <h1>
                    {content.title || content.name
                      ? content.title || content.name
                      : "Not Available"}
                  </h1>
                  <p>{content.overview}</p>
                  <p>
                    Release Date :{" "}
                    {content.release_date || content.first_air_date
                      ? content.release_date || content.first_air_date
                      : "Not Available"}
                  </p>
                  {content.budget && 
                    <p>
                      Budget :{" "}
                      {content.budget.toString().slice(0, 3)}
                      M
                    </p>
                  }
                  <p>
                    Genre :
                    {content.genres && content.genres.map((element) => {
                      return (
                        <Chip
                          sx={{ marginRight: 1, marginLeft: 1, marginTop: 1 }}
                          label={element.name}
                          color="primary"
                        />
                      );
                    })}
                  </p>
                  <p>Status : {content.status}</p>
                  <p>
                    Rating :
                    <Chip
                      sx={{ marginLeft: 1 }}
                      label={content.vote_average}
                      color={content.vote_average > 7 ? "primary" : "secondary"}
                    />
                  </p>
                  <p>
                    Production Companies :
                    {content.production_companies && content.production_companies.map((element) => {
                      return (
                        <Chip
                          sx={{ marginRight: 1, marginLeft: 1, marginTop: 1 }}
                          label={element.name}
                          color="secondary"
                        />
                      );
                    })}
                  </p>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 3, bgcolor: "error.main", width: "100%" }}
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    <YouTubeIcon sx={{ marginRight: 1 }} /> Watch Trailer
                  </Button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default Popup;
