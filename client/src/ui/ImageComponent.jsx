import React, { useState } from "react";

const ImageComponent = ({
	mainImageSrc,
	placeholderSrc = "",
	altText,
	width = "3rem",
	height = "4rem",
}) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setIsImageLoaded(true);
	};

	return (
		<div style={{ position: "relative", width, height }}>
			{!isImageLoaded && (
				<img
					src="/Images/HeroHolder.jpg"
					alt="Placeholder"
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
				src={mainImageSrc}
				alt={altText}
				onLoad={handleImageLoad}
				style={{
					display: isImageLoaded ? "block" : "none",
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
};

export default ImageComponent;
