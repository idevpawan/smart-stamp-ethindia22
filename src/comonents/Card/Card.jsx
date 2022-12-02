import React from "react";
import photo from "../../assets/nft.png";
import "./card.css"

export default function Card() {
  return (
    <div>
      <div className="card">
        <img src={photo} alt="avatar" />
        <div className="container">
          <h4>
            <b>afdfgggeerwf</b>
          </h4>
          <p><span>Owner: </span> addffwfgrw</p>
        </div>
      </div>
    </div>
  );
}
