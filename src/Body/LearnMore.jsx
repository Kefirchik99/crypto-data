import React from "react";
import Image from "react-bootstrap/Image";
import LearnMoreImage from '../pictures/Learn-more.png'

function CryptoInfoImage() {
    const handleImageClick = () => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley", "_blank");
    };

    return (
        <div className="crypto-info-image">
            <h5>More about Crypto Olive</h5>
            <Image
                src={LearnMoreImage}
                alt="Bitcoin Info"
                fluid
                onClick={handleImageClick}
                className="clickable-image"
            />
        </div>
    );
}

export default CryptoInfoImage;
