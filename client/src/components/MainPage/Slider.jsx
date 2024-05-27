import React, { useEffect, useState } from "react";


import { CCarousel } from "@coreui/react";
import { CCarouselItem } from '@coreui/react';
import { CImage } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'

const Slider = (props) => {

  const [image, setImg] = useState([]);
 
  const getPics = async () => {
    
    const request =  fetch("/allpicturiesslider")
    let content =  request//.json();
    console.log(content)
    /*
    content = content.map((x) => x.picture);
    
    let pictures = [];
    for (let i = 0; i < content.length; i++) {
      const res = await fetch("/downloadpictureslider", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: content[i],
        }),
      })
        .then((res) => res.blob())
        .then((data) => {
          pictures[i] = URL.createObjectURL(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setImg(pictures);
    }
    */
  };
  useEffect(() => {
    getPics();
  }, []);
  return (
    <div className="slider-wrapper">
    <CCarousel controls indicators>
    {image.length>0 && image.map(x=>(
      <CCarouselItem>
        <CImage
          className="d-block w-100 slider-wrapper"
          src={x}
          alt="slide 1"
        />
      </CCarouselItem>
    )

    )}
      
      
    </CCarousel>
    </div>
  );
};

export default Slider;

