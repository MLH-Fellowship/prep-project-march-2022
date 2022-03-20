import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./HourlyForecast.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const HourlyForecast = () => {
  return (
    <div>
      <div className="component">
        <Carousel responsive={responsive}>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5" component="div">
              9 : 00 Am
            </Typography>
            <Typography color="text.secondary">Monday</Typography>
            <Typography variant="h4">25° C</Typography>
          </CardContent>
        </Carousel>
      </div>
    </div>
  );
};

export default HourlyForecast;
