import React, { useEffect, useState } from 'react'
import profilePic from '../imgs/profilePic.png'
import './userPage.css'
import Categorychip from './Categorychip'
import axios from 'axios'
import pressureIcon from '../imgs/pressureIcon.png'
import windIcon from '../imgs/windIcon.png'
import humidityIcon from '../imgs/humidityIcon.png'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function UserPage() {
    const [date, setDate]= useState('');
    const [time, setTime]= useState('');
    const [weatherText,setWeatherText]=useState('')
    const [weatherIcon,setWeatherIcon]=useState('')
    const [weatherDetails,setWeatherDetails]=useState('')
    const [newsDetails,setNewsDetails]=useState('')
    const [notes,setNotes]=useState('this  is how I am going to learn MERN Stack....')
    
    function handleNotesChange(e){
        setNotes(e.target.value)
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.notes = e.target.value;
        localStorage.setItem("userData", JSON.stringify(userData));    
    }
    setInterval(()=>{
        let time=new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        setTime(strTime);
    },1)
    useEffect(()=>{
        let newDate= new Date();
        let month=newDate.getMonth()+1;
        let year=newDate.getFullYear();
        let day=newDate.getDate();
        setDate([day,month,year].join('-'))
        
    },[])
    useEffect(()=>{
        //weather 
        async function getWeatherData(){
            let weatherData = await axios.get('https://api.weatherapi.com/v1/current.json?key=3b5aac5cd5e946be8cc25655232410&q=Anantapur&aqi=no')
            setWeatherDetails(weatherData)
            setWeatherIcon(weatherData.data.current.condition.icon)
            setWeatherText(weatherData.data.current.condition.text)
       }
        getWeatherData()

        async function getNewsData(){
            let newsData= await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=6230944e0b8343d29f37ae55c45722aa')
            setNewsDetails(newsData);
            console.log(newsDetails && newsDetails.data.articles[0].urlToImage)

        }
        getNewsData()
    },[])
    
    

    const userData=JSON.parse(localStorage.getItem('userData'))
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
                           { userData.categories.map((element)=>{
                               return <Categorychip key={element}title={element} displayX={false} 
                                chipBg={{background:'#9F94FF',width:'5vw',margin:'6px','font-size':'100%','font-weight':'500'}}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className="userWeather">
                    <div className="userWeatherDate">
                        <div className="date">
                            {date}
                        </div>
                        <div className="time">
                            {time}
                        </div>
                    </div>
                    <div className="userWeatherWeather">
                            <div className="weather1">
                                <img src={weatherIcon} 
                                className='weatherIcon' />
                                <p className='weatherText'>{weatherText}</p>
                            </div>
                            <div className="weatherLine"></div>
                            <div className="weather2">
                                <p className='weatherText temperature'>{weatherDetails&&weatherDetails.data.current.temp_c } C</p>
                                <div className="pressure">
                                    <img src={pressureIcon} className='icon' alt="" />
                                    <p className='weatherText'>{weatherDetails&&weatherDetails.data.current.pressure_mb}mbar</p>
                                </div>
                            </div>
                            <div className="weatherLine"></div>
                            <div>
                            <div className="pressure">
                                    <img src={windIcon} className='icon' alt="" />
                                    <p className='weatherText'>{weatherDetails&&weatherDetails.data.current.wind_kph}Kmph</p>
                            </div><br />
                            <div className="pressure">
                                    <img src={humidityIcon} className='icon' alt="" />
                                    <p className='weatherText'> {weatherDetails&&weatherDetails.data.current.humidity}mbar</p>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="notes">
                <h1>My Notes</h1>
                <textarea name="" id="" cols="30" rows="10" className="notesInput" onChange={handleNotesChange}>{notes}</textarea>
            </div>
            </div>
            <br />
                <div className="Usertimer">
                    <div className="userTimerLeft"></div>
                    <div className="userTimerRight">
                        <div className="hoursMinutesSeconds">
                            <span>Hours</span>
                            <span>minutes</span>
                            <span>Seconds</span>
                        </div>
                        <div className="timerTriangles"></div>
                    </div>
                </div>
            </div>
            <div className="news">
                <div className="newsImg" style={{ backgroundImage: `url(${newsDetails && newsDetails.data.articles[5].urlToImage})` }}>
                     <div className="newsTitle">
                        <h3>{newsDetails&&newsDetails.data.articles[5].title}</h3>
                        <div className="newsDateandTime">
                            <div className="newsDate"><p>{date}</p></div>
                            <div className="newsline"></div>
                            <div className="newsTime"><p>{time}</p></div>
                        </div>
                     </div>
                </div>
                <div className="newsText">
                    <p>
                        {newsDetails&&newsDetails.data.articles[5].content}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserPage
