import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'


export default function CarouselPreview(props) {
  return (
    <Carousel>
      {props &&
        props.images.map((image) => {
          return (
            <div>
              <img src={image.base64} />
              <p>{image.legend || ""}</p>
            </div>
          );
        })}
    </Carousel>
  );
}
