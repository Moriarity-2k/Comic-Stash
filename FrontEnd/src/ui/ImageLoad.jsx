import PropTypes from "prop-types";

import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "./AppLayout";
import { useState } from "react";

function ImageLoad({ src, alt }) {
	const ImageURL = `${PROJECT_URL}${src}?alt=media&token=${IMAGE_PUBLIC_TOKEN}`;
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setIsImageLoaded(true);
	};
	return (
		<div className=" w-40 h-64 md:w-45 md:h-72 lg:w-60 lg:h-96 relative transition-all duration-1000">
			{!isImageLoaded && (
				<img
					src="Images/HeroHolder.jpg"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
					}}
				/>
			)}

			<img
				className="transition-all h-auto w-full duration-100 bg-contain bg-pink-300"
				src={ImageURL}
				onLoad={handleImageLoad}
				style={{
					display: isImageLoaded ? "block" : "none",
					width: "100%",
					height: "100%",
				}}
				alt={alt ? alt : src.split("_")[1]}
			/>
		</div>
	);
}

ImageLoad.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
};

export default ImageLoad;
