import { useNavigation } from "react-router-dom";
import PropTypes from "prop-types";

import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "./AppLayout";
// import Tilt from "react-parallax-tilt";

function ImageLoad({ src, alt }) {
	const x = useNavigation();
	const ImageURL = `${PROJECT_URL}${src}?alt=media&token=${IMAGE_PUBLIC_TOKEN}`;

	if (x.state === "loading")
		return <div className="w-full h-full bg-white text-white">hello</div>;
	else
		return (
			// <Tilt>
				// <div className="hover:-translate-y-8 w-40 h-64 md:w-45 md:h-72 lg:w-60 lg:h-96 transition-all duration-1000">
				<div className=" w-40 h-64 md:w-45 md:h-72 lg:w-60 lg:h-96 transition-all duration-1000">
					<img
						style={{ backgroundBlendMode: "color-burn" }}
						className="transition-all h-auto w-full duration-100 bg-contain bg-pink-300"
						src={ImageURL}
						alt={alt ? alt : src.split("_")[1]}
					/>
				</div>
			// {/* </Tilt> */}
		);
}

ImageLoad.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
};

export default ImageLoad;
