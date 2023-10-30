import React ,{useState,useEffect}from 'react'
import Profile from '../imgs/toggleIcon.png'
import styles from './movies.module.css'
import { useNavigate } from 'react-router-dom';
function Movies() {
    const navigate=useNavigate()
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    const movies=userData.categories
    function handleToggleIcon(){
        navigate('/user')
    }
    return (
      <>
        <div
          style={{
            width: "100vw",
            minHeight: "100vh",
            background: "black",
            overflowX: "hidden",
            maxHeight: "100vh",
          }}
        >
          <img
            src={Profile}
            style={{
              position: "absolute",
              top: "2vh",
              right: "3vw",
              height: "60px",
              width: "60px",
            }}
            onClick={handleToggleIcon}
          />
          <p
            style={{
              color: "green",
              fontSize: "3rem",
              margin: "1vw",
            }}
            className={styles.header}
          >
            Super app
          </p>
          <p style={{ color: "white", fontSize: "2rem", margin: "2vw" }}>
            Entertainment according to your choice
          </p>
          {movies.map((movie) => (
            <List genre={movie} />
          ))}
        </div>
      </>
    );
}

export default Movies

const List = ({ genre }) => {
    const [movies, setMovies] = useState([]);
    console.log(movies);
    useEffect(() => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "84d716def9mshfda12e4c205103ep172fcejsncd20c7a2ef26",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };
      const fetchMovies = async () => {
        await fetch(
          `https://moviesdatabase.p.rapidapi.com/titles?genre=${genre}&year=2020`,
          options
        )
          .then((response) => response.json())
          .then((response) => setMovies(response.results.splice(4, 4)))
          .catch((err) => console.error(err));
      };
      fetchMovies();
    }, []);
    return (
      <>
        <p className={styles.heading} style={{ overflowY: "hidden" }} >
          {genre}
        </p>
        <div style={{ display: "flex", overflow: "hidden", marginLeft: "2vw" }}>
          {movies.map((movie, idx) => {
            return (
              <div key={idx} style={{ width: "20vw", margin: "2vw" }}>
                <img
                  src={movie?.primaryImage?.url}
                  style={{
                    objectFit: "cover",
                    width: "15vw",
                    height: "15vh",
                    borderRadius: "12px",
                  }}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  };
  