import React from "react";
import photo from "../../assets/nft.png";
import "./card.css";

export default function Card() {
  return (
    <div>
      <div className="card">
        <img src={photo} alt="avatar" />
        <div className="container py-4">
          <p className="text-sm">afdfgggeerwf</p>
          <p className="text-xs">
            <span>Owner: </span> addffwfgrw
          </p>
        </div>
      </div>
    </div>
  );
}
