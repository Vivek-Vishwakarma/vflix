import "./App.css";
import Navbar from "./components/Navbar";
import ScrollToTop from "react-scroll-to-top";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trending from "./components/Trending";
import Movies from "./components/Movies";
import Tv from "./components/Tv";
import Search from "./components/Search";
import Homepage from "./components/Homepage";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop smooth />
        <Routes>
          <Route exact="true" path="/vflix" element={<Homepage apiKey={apiKey} />} />
          <Route exact="true" path="/trending" element={<Trending apiKey={apiKey} />} />
          <Route exact="true" path="/movies" element={<Movies apiKey={apiKey} />} />
          <Route exact="true" path="/tvseries" element={<Tv apiKey={apiKey} />} />
          <Route exact="true" path="/search" element={<Search apiKey={apiKey} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
