import { FaRupeeSign, FaStar } from "react-icons/fa";
import ImageLoad from "./ImageLoad";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Tilt from "react-parallax-tilt";

const EachCard = ({ Image, ratingsAverage, price, name, slug }) => {
	return (
		<NavLink to={`/books/${slug}`}>
			<Tilt>
				<div className="my-6 mx-1 shadow-[#ff4d5a] shadow-inner w-max  p-2 md:px-4">
					<ImageLoad src={Image} />

					<div className="text-white mb-2">
						<h1 className="text-sm mt-4 md:text-base lg:text-lg font-bold uppercase font-mono tracking-tight">
							{name.split(" ")[0]} {name.split(" ")[1]}
						</h1>
						<div className="text-xs flex mt-2 items-center justify-between">
							<div className="flex items-center gap-2">
								<div>{ratingsAverage.toFixed(1)}</div>
								<FaStar />
							</div>
							<div className="flex items-center gap-1">
								<FaRupeeSign />
								<strong>{price}</strong>
							</div>
						</div>
					</div>
				</div>
			</Tilt>
		</NavLink>
	);
};

EachCard.propTypes = {
	Image: PropTypes.string,
	ratingsAverage: PropTypes.number,
	price: PropTypes.number,
	id: PropTypes.string,
	name: PropTypes.string,
	slug: PropTypes.string,
};

export default EachCard;
