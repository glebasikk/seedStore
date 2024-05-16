import React, { useRef, useEffect } from 'react';
import del from './del.svg'; // Svg Icon
import add from './add.svg';  // Svg Icon
import styled from 'styled-components';
import Buttons from './Buttons';
import './Carousel.css';


let Wrapper = styled.div`
      position: relative;
      width: 977px;
      overflow-x: hidden;
`

const Slide = styled.div`
  display: flex;
  width: 977px;
  height: 450px;
  transition: transform 0.4s ease-in-out;
  transform: ${props => `translateX(${props.xPosition}px)`};{
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1220px) {
    width:100vw;
    height:300px;
 }
`;
let Btn;

function Carousel({
  images,
  setWidth,
  xPosition,
  handleClickPrev,
  handleClicknext,
  isAdmin,
  uploadImage,
}) {
  if(isAdmin){
    Wrapper=styled.div`
      height: 510px;
      position: relative;
      width: 977px;
      overflow-x: hidden;

       @media (max-width: 1220px) {
        width:100vw;
        height: 360px;
     }
    `
    
    Btn=styled.div`
    min-height: 60px;
    background-color: #16642C;
    width:100%;
    text-align: center;
    display:flex;
    justify-content:center;
    gap:100px;
    align-items:center;

    @media (max-width: 1220px) {
      width:100vw;
   }
    `
    
  }
  else{
    Wrapper=styled.div`
      height: 450px;
      position: relative;
      width: 977px;
      overflow-x: hidden;
      @media (max-width: 1220px) {
        width:100vw;
        height: 300px;
     }
  `
  Btn=styled.div`
    display:none;`
  }
  const slideRef = useRef();
  useEffect(() => {
    if (slideRef.current) {
      const width = slideRef.current.clientWidth;
      setWidth(width);
    }
  }, [setWidth]);
  
  function deleteImage(i){
    window.localStorage.removeItem(window.localStorage.key(i))
    window.location.reload();
  }
 


  return (
   
    <Wrapper>
      <Slide xPosition={xPosition} ref={slideRef}>
        {images.map((img, i) => (
          <div className="carousel-div">
            <img src={img} key={i} className="carousel-image" ></img>
            <Btn>
                <button type="button" className="image-delete-button" onClick={function(){deleteImage(i)}}><img src={del} style={{ height: 53, width: 36 }} /></button> 
            </Btn>
          </div>
        ))}
      </Slide>
      <Buttons
        handleClickPrev={handleClickPrev}
        handleClicknext={handleClicknext}
      />
    
      
    </Wrapper>
    
  );
}export default Carousel;



  