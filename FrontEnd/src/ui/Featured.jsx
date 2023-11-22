import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

function Featured({ fetchedBooks, name, render }) {
	const sendTo = name.split(" ").join("-");

	return (
		<div className="my-16">
			<div className="text-white font-mono transition-all duration-1000  flex items-center justify-between">
				<h1 className="pl-4 md:text-3xl uppercase tracking-wide text-white">
					{name}
				</h1>
				<NavLink to={`/showcase/${sendTo}`}>
					<button className="text-xs md:text-sm flex items-center border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border- hover:bg-wierdBlue hover:text-white rounded-sm">
						<span className="block">View More</span>
						<FaLongArrowAltRight />
					</button>
				</NavLink>
			</div>
			<div className="scroll-hidden relative mt-4 overflow-x-scroll flex gap-4 md:gap-6 lg:gap-10 items-start">
				{fetchedBooks && fetchedBooks.map(render)}
			</div>
		</div>
	);
}

export default Featured;
