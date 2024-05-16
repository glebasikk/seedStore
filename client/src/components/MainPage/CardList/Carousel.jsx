import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';


let Wrapper = styled.div`
      position: relative;
      width: 370px;
      overflow-x: hidden;
`

const Slide = styled.div`
  display: flex;
  width: 370px;
  height: 225px;
  transition: transform 0.4s ease-in-out;
  transform: ${props => `translateX(${props.xPosition}px)`};{
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1220px) {
    width:300px;
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
    Wrapper=styled.div`
      height: 225px;
      position: relative;
      width: 370px;
      overflow-x: hidden;
      @media (max-width: 1220px) {
        width:300px;
        height: 300px;
     }
  `
  const slideRef = useRef();
  useEffect(() => {
    if (slideRef.current) {
      const width = slideRef.current.clientWidth;
      setWidth(width);
    }
  }, [setWidth]);
  

 


  return (
   
    <Wrapper>
      <Slide xPosition={xPosition} ref={slideRef}>
        {images.map((img, i) => (
          <div className="carousel-div">
            <img src={img} key={i} className="card-info-img" ></img>
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



  