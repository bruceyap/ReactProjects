import React from "react";
import chess from "../public/img/chess.png";
import image from "../public/img/coding.png";

export default function AboutMe() {
  return (
    <div className="section-about" id="aboutme">
      <div className="aboutme-container">
        <img src={image} className="graphic" alt="3D graphic" />
        <div className="description">
          <h2>About me</h2>
          <div className="text">
            I am a beginner front-end developer and I am skilled in HTML, CSS
            and JavaScript web development, as well as the React framework. 
            I am looking to gain valuable experience in web development
            and expand my competence in IT industry. I am ready for challenges and 
            eager to learn and acquire new skills.
            <br />
            <br /> I graduated from the University of Technology Malaysia
            with a degree in Computer Science with a
            specialization in Graphics and Multimedia.
            <br />
            <br />
            In addition to develop web applications, I am
            interested in playing chess, playing table tennis and swimming.
            <img src={chess} />
          </div>
        </div>
      </div>
    </div>
  );
}
