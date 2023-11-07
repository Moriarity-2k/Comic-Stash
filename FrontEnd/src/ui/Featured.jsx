import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import EachCard from "./EachCard";
import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "./AppLayout";

function Featured({fetchedBooks , name , render}) {
	return (
		<div className="my-16">
			<div className="text-white font-mono transition-all duration-1000  flex items-center justify-between">
				<h1 className="pl-4 md:text-3xl uppercase tracking-wide text-white">
					{name}
				</h1>
				<NavLink to="/featured">
					<button className="text-xs md:text-sm flex items-center border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border- hover:bg-wierdBlue hover:text-white rounded-sm">
						<span className="block">View More</span>
						<FaLongArrowAltRight />
					</button>
				</NavLink>
			</div>
			{/* <div className="scroll-hidden mt-4 overflow-x-scroll flex items-start"> */}
			<div className="scroll-hidden relative mt-4 overflow-x-scroll flex gap-4 md:gap-6 lg:gap-10 items-start">
				{fetchedBooks &&
					fetchedBooks.map(render)}
			</div>
		</div>
	);
}

export default Featured;
