import "./ImageList.css";
import React from "react";
import ImageCard from "./ImageCard";

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <ImageCard key={image.id} image={image.images.original.url} />;
  });

  let images1 = [];
  let images2 = [];
  let images3 = [];

  for (let i = 0; i < images.length; i += 1) {
    const image = images[i];
    if (i % 3 === 0) {
      images1.push(image);
    } else if ((i % 3) - 1 === 0) {
      images2.push(image);
    } else {
      images3.push(image);
    }
  }

  return (
    <div className="row">
      <div className="col">{images1}</div>
      <div className="col">{images2}</div>
      <div className="col">{images3}</div>
    </div>
  );
};

export default ImageList;
