import React, { useState } from "react";
import styles from "./category.module.css";
import error from '../imgs/Vector.png'
import action from '../imgs/action.png'
import drama from '../imgs/drama.png'
import fantasy from '../imgs/fantasy.png'
import fiction from '../imgs/fiction.png'
import horror from '../imgs/horrorr.png'
import music from '../imgs/music.png'
import romance from '../imgs/romance.png'
import thriller from '../imgs/thriller.png'
import western from '../imgs/western.png'
import Categorychip from "./Categorychip";
function Category() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [nothreeSelected, setnoThreeSelected]=useState(false)
    function handleCategoryClick(categoryTitle){
        setnoThreeSelected(false)
        if (selectedCategories.includes(categoryTitle)) {
            setSelectedCategories(selectedCategories.filter((title) => title !== categoryTitle));
          } else {
            setSelectedCategories([...selectedCategories, categoryTitle]);
          }
    }
    function goToNextPage(){
        if(selectedCategories.length<3){
            setnoThreeSelected(true)
        }
        else{
            setnoThreeSelected(false) 
            let obj=JSON.parse(localStorage.getItem('userData'))
            obj.categories=selectedCategories;
            localStorage.setItem('userData',JSON.stringify(obj))
        }
    }
  return (
    <div>
      <div className={styles.outerContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftOuter}>
            <h1>Super app</h1>
            <h1 className={styles.bigText}>
              Choose your entertainment category
            </h1>
            <div className={styles.categoryContainer}>{selectedCategories.map((Title,idx) => (
                <Categorychip key={idx} title={Title} fnToRemove={handleCategoryClick} />
              ))}
            </div>
            {nothreeSelected?
            <div className={styles.errorContainer}>
                <img src={error} alt="" />
                <span>Minimum 3 category required</span>
            </div> :''}
            
          </div>
        </div>
        <div className={styles.rightContainer}>
            <div className={styles.categoryBoxsContainer}>
                <div className={styles.box }>
                    <div className={`${styles.action} ${styles.square} ${selectedCategories.includes('Action')?styles.squareGreen:''}`}  onClick={()=>{handleCategoryClick('Action')}}> <p>Action</p> <img  src= {action} alt="" /> </div>
                    <div className={`${styles.drama} ${styles.square} ${selectedCategories.includes('Drama')?styles.squareGreen:''}`} onClick={()=>{handleCategoryClick('Drama')}}> <p>Drama</p> <img src= {drama} alt="" /> </div>
                    <div className={`${styles.romance} ${styles.square} ${selectedCategories.includes('Romance')?styles.squareGreen:''}`}onClick={()=>{handleCategoryClick('Romance')}}> <p>Romance</p> <img src= {romance} alt="" /> </div>
                </div>
                <div className={styles.box }>
                    <div className={`${styles.thriller} ${styles.square} ${selectedCategories.includes('Thriller')?styles.squareGreen:''}`} onClick={()=>{handleCategoryClick('Thriller')}}> <p>Thriller</p> <img src= {thriller} alt="" /> </div>
                    <div className={`${styles.western} ${styles.square} ${selectedCategories.includes('Western')?styles.squareGreen:''}`}onClick={()=>{handleCategoryClick('Western')}}> <p>Western</p> <img src= {western} alt="" /> </div>
                    <div className={`${styles.horror} ${styles.square} ${selectedCategories.includes('Horror')?styles.squareGreen:''}`}onClick={()=>{handleCategoryClick('Horror')}}> <p>Horror</p> <img src= {horror} alt="" /> </div>
                </div>
                <div className={styles.box }>
                    <div className={`${styles.fantasy} ${styles.square} ${selectedCategories.includes('Fantasy')?styles.squareGreen:''}`}onClick={()=>{handleCategoryClick('Fantasy')}}> <p>Fantasy</p> <img src= {fantasy} alt="" /> </div>
                    <div className={`${styles.music} ${styles.square} ${selectedCategories.includes('Music')?styles.squareGreen:''}`}onClick={()=>{handleCategoryClick('Music')}}> <p>Music</p> <img src= {music} alt="" /> </div>
                    <div className={`${styles.fiction} ${styles.square} ${selectedCategories.includes('Fiction')?styles.squareGreen:''}`}onClick={()=>{handleCategoryClick('Fiction')}}> <p>Fiction</p> <img src= {fiction} alt="" /> </div>
                </div>
                <div className={styles.btnOuter}>
                    <button onClick={goToNextPage}>Next Page</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
