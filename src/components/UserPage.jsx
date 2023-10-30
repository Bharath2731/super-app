import React, { useEffect, useState } from "react";
import profilePic from "../imgs/profilePic.png";
import "./userPage.css";
import Categorychip from "./Categorychip";
import axios from "axios";
import pressureIcon from "../imgs/pressureIcon.png";
import windIcon from "../imgs/windIcon.png";
import timerIncrease from "../imgs/timerIncrease.png";
import timerDecrease from "../imgs/timerDecrease.png";
import humidityIcon from "../imgs/humidityIcon.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {useNavigate} from 'react-router-dom'

function UserPage() {
    const navigate= useNavigate()

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weatherText, setWeatherText] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherDetails, setWeatherDetails] = useState("");
  const [newsDetails, setNewsDetails] = useState("");
  const [notes, setNotes] = useState(
    "this  is how I am going to learn MERN Stack...."
  );
  const [hours, settHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minuits, setMinuits] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //timer states
  const [timerduration, setTimerDuration] = useState(
    hours * 60 * 60 + minuits * 60 + seconds
  );
  const [key, setKey] = useState(0);

  function handleStartAndStop() {
    if (isPlaying) {
      settHours(0);
      setMinuits(0);
      setSeconds(0);
      setTimerDuration(hours * 60 * 60 + minuits * 60 + seconds);
      setIsPlaying(false);
      setKey(key + 1);
    } else {
      setTimerDuration(hours * 60 * 60 + minuits * 60 + seconds);
      setIsPlaying(true);
    }
  }
  function handleNotesChange(e) {
    setNotes(e.target.value);
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData.notes = e.target.value;
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  function handleBrowse(){
    navigate('/movies')
  }
  setInterval(() => {
    let time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    setTime(strTime);
  }, 1);
  useEffect(() => {
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let day = newDate.getDate();
    setDate([day, month, year].join("-"));
  }, []);
  useEffect(() => {
    //weather
    async function getWeatherData() {
      let weatherData = await axios.get(
        "https://api.weatherapi.com/v1/current.json?key=3b5aac5cd5e946be8cc25655232410&q=Anantapur&aqi=no"
      );
      setWeatherDetails(weatherData);
      setWeatherIcon(weatherData.data.current.condition.icon);
      setWeatherText(weatherData.data.current.condition.text);
    }
    getWeatherData();

    async function getNewsData() {
      let newsData = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=6230944e0b8343d29f37ae55c45722aa"
      );
      setNewsDetails(newsData);
      console.log(newsDetails && newsDetails.data.articles[0].urlToImage);
    }
    getNewsData();
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData)

  return (
    <div>
      <div className="userOuter">
        <div className="leftOuter">
          <div className="userLeft">
            <div className="userLeftOuterUserProfileWeather">
              <div className="userProfile">
                <div className="userProfilePic">
                  <img src={profilePic} alt="" />
                </div>
                <div className="userData">
                  <div className="userDateText">
                    <p className="userName">{userData.name}</p>
                    <p className="userEmail">{userData.email}</p>
                    <p className="userUserName">{userData.userName}</p>
                  </div>
                  <div className="userDataCategory">
                    {userData.categories.map((element) => {
                      return (
                        <Categorychip
                          key={element}
                          title={element}
                          displayX={false}
                          chipBg={{
                            background: "#9F94FF",
                            width: "5vw",
                            margin: "6px",
                            "font-size": "100%",
                            "font-weight": "500",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="userWeather">
                <div className="userWeatherDate">
                  <div className="date">{date}</div>
                  <div className="time">{time}</div>
                </div>
                <div className="userWeatherWeather">
                  <div className="weather1">
                    <img src={weatherIcon} className="weatherIcon" />
                    <p className="weatherText">{weatherText}</p>
                  </div>
                  <div className="weatherLine"></div>
                  <div className="weather2">
                    <p className="weatherText temperature">
                      {weatherDetails && weatherDetails.data.current.temp_c} C
                    </p>
                    <div className="pressure">
                      <img src={pressureIcon} className="icon" alt="" />
                      <p className="weatherText">
                        {weatherDetails &&
                          weatherDetails.data.current.pressure_mb}
                        mbar
                      </p>
                    </div>
                  </div>
                  <div className="weatherLine"></div>
                  <div>
                    <div className="pressure">
                      <img src={windIcon} className="icon" alt="" />
                      <p className="weatherText">
                        {weatherDetails && weatherDetails.data.current.wind_kph}
                        Kmph
                      </p>
                    </div>
                    <br />
                    <div className="pressure">
                      <img src={humidityIcon} className="icon" alt="" />
                      <p className="weatherText">
                        {" "}
                        {weatherDetails && weatherDetails.data.current.humidity}
                        mbar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notes">
              <h1>My Notes</h1>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="notesInput"
                onChange={handleNotesChange}
              >
                {notes}
              </textarea>
            </div>
          </div>
          <br />
          <div className="Usertimer">
            <div className="userTimerLeft">
              <div className="timerCircleOuter">
                <CountdownCircleTimer
                  size={180}
                  key={key}
                  duration={hours * 60 * 60 + minuits * 60 + seconds}
                  colors={"#FF6A6A"}
                  isPlaying={isPlaying}
                  strokeWidth={6}
                  onComplete={() => [false, 0]}
                >
                  {({ remainingTime }) => {
                    if (isPlaying) {
                      const hours = Math.floor(remainingTime / 3600);
                      const minutes = Math.floor((remainingTime % 3600) / 60);
                      const seconds = remainingTime % 60;
                      if (remainingTime === 0) {
                        return (
                          <div className="timercircle">
                            <p>00:00:00</p>
                          </div>
                        );
                      }
                      return (
                        <div className="timercircle">
                          <p>
                            {hours < 10 ? "0" : ""}
                            {hours}:{minuits < 10 ? "0" : ""}
                            {minutes}:{seconds < 10 ? "0" : ""}
                            {seconds}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <div className="timercircle">
                        <p>00:00:00</p>
                      </div>
                    );
                  }}
                </CountdownCircleTimer>
              </div>
            </div>
            <div className="userTimerRight">
              <div className="userTimerRightTop">
                <div className="hours">
                  <p style={{ textAlign: "center" }}>Hours</p>
                  <img
                    src={timerIncrease}
                    alt=""
                    onClick={() => {
                      if (hours < 24) {
                        settHours(hours + 1);
                      }
                    }}
                  />
                  <p className="timerWhiteText">
                    {hours < 10 ? "0" : ""}
                    {hours}
                  </p>
                  <img
                    src={timerDecrease}
                    alt=""
                    onClick={() => {
                      if (hours > 0) {
                        settHours(hours - 1);
                      }
                    }}
                  />
                </div>
                <div className="minuits">
                  <p style={{ textAlign: "center" }}>Minutes</p>
                  <img
                    src={timerIncrease}
                    alt=""
                    onClick={() => {
                      if (minuits < 60) {
                        setMinuits(minuits + 1);
                      }
                    }}
                  />
                  <p className="timerWhiteText">
                    {minuits < 10 ? "0" : ""}
                    {minuits}
                  </p>
                  <img
                    src={timerDecrease}
                    alt=""
                    onClick={() => {
                      if (minuits > 0) {
                        setMinuits(minuits - 1);
                      }
                    }}
                  />
                </div>
                <div className="seconds">
                  <p style={{ textAlign: "center" }}>Seconds</p>
                  <img
                    src={timerIncrease}
                    alt=""
                    onClick={() => {
                      if (seconds < 60) {
                        setSeconds(seconds + 1);
                      }
                    }}
                  />
                  <p className="timerWhiteText">
                    {seconds < 10 ? "0" : ""}
                    {seconds}
                  </p>
                  <img
                    src={timerDecrease}
                    alt=""
                    onClick={() => {
                      if (seconds > 0) {
                        setSeconds(seconds - 1);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="userTimerRightBottom">
                <button onClick={handleStartAndStop}>
                  {isPlaying ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="newsOuter">
          <div className="news">
            <div
              className="newsImg"
              style={{
                backgroundImage: `url(${
                  newsDetails && newsDetails.data.articles[3].urlToImage
                })`,
              }}
            >
              <div className="newsTitle">
                <h3>{newsDetails && newsDetails.data.articles[3].title}</h3>
                <div className="newsDateandTime">
                  <div className="newsDate">
                    <p>{date}</p>
                  </div>
                  <div className="newsline"></div>
                  <div className="newsTime">
                    <p>{time}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="newsText">
              <p>{newsDetails && newsDetails.data.articles[3].content}</p>
            </div>
          </div>
          <div className="browseBtn">
            <button onClick={handleBrowse}>Browse</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
