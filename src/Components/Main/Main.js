import React from "react";
import './Main.css';

export default function Main() {
    return (
        <div className="main">
            <div className="welcome-message">
                <h2>Welcome to the Outermess!</h2>
                {/* <p>Embark on a journey beyond the stars with Outermess, an ardent aficionado of space exploration. From the breathtaking beauty of distant galaxies to the awe-inspiring wonder of celestial phenomena, Outermess finds solace in the boundless expanse of the universe.</p> */}
            </div>
            <img className="bg-image" name="main-image" alt="background" src="./assets/bg.jpg" />
            <div className="welcome-message">
                {/* <h2>Welcome to the Outermess!</h2> */}
                <p>Embark on a journey beyond the stars with Outermess, an ardent aficionado of space exploration. From the breathtaking beauty of distant galaxies to the awe-inspiring wonder of celestial phenomena, Outermess finds solace in the boundless expanse of the universe.</p>
            </div>
        </div>
    );
}
