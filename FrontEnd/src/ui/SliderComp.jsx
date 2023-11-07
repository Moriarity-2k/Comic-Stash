import { useEffect, useState } from "react";
import styled from "styled-components";

import MainBg1 from "/Images/MainBg1.jpg";
import MainBg2 from "/Images/MainBg2.jpg";
import MainBg3 from "/Images/MainBg3.jpg";
import MainBg4 from "/Images/MainBg4.jpg";

// const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;

let h = 1;

const SlideContainer = styled.div`
	margin: 2rem auto;
	overflow: hidden;
	width: 60%;
	height: 80%;
`;

const Slider = styled.div`
	white-space: nowrap;
	transition: ease-in-out 1000ms;
	height: 100%;
`;

const Slide = styled.div`
	display: inline-block;
	height: 100%;
	width: 100%;
	border-radius: 40px;
`;

const SliderComp = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setTimeout(() => {
			if (index === 3) h = -1;
			else if (index === 0) h = 1;
			setIndex((index) => {
				return index + h;
			});
		}, delay);

		return () => {
			clearTimeout(id);
		};
	}, [index]);

	return (
		<div className="flex justify-between items-center">
			<SlideContainer
				style={{
					boxShadow: "var(--shadow-md)",
				}}
				// className="relative border-wierdBlue border-x-2 bg-[#017aca94]"
				className="relative"
			>
				<Slider
					style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
				>
					<Slide>
						<img className="" src={MainBg4} />
					</Slide>
					<Slide>
						<img className="" src={MainBg2} />
					</Slide>
					<Slide>
						<img className="" src={MainBg3} />
					</Slide>
					<Slide>
						<img className="" src={MainBg1} />
					</Slide>
				</Slider>
				<div className="absolute bg-[#00000098] inset-0"></div>
			</SlideContainer>
		</div>
	);
};

export default SliderComp;
