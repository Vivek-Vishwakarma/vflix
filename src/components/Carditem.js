import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Badge } from "@mui/material";
import "../App.css";
import Popup from "./Popup";

export default function Carditem({ element, id, type, page, apiKey }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Popup id={id} type={type} apiKey={apiKey}>
        <Badge
          badgeContent={element.vote_average}
          color={element.vote_average > 7 ? "primary" : "secondary"}
        >
          <Card sx={{ maxWidth: 320 }} className="carditem">
            <CardMedia
              component="img"
              alt={element.original_title}
              height="300"
              image={`https://image.tmdb.org/t/p/w300${element.poster_path}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {element.name || element.title
                  ? element.name || element.title
                  : "Title not available"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {element.overview.slice(0, 140)}
              </Typography>
              <hr />
              <div className="type">
                <div className="innertype">
                  {capitalizeFirstLetter(element.media_type ? element.media_type : " ")}
                </div>
                <div className="innertype">
                  {element.release_date || element.first_air_date
                    ? element.release_date || element.first_air_date
                    : "Not Available"}
                </div>
              </div>
            </CardContent>
          </Card>
        </Badge>
      </Popup>
    </>
  );
}
