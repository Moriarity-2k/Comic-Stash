import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import EachCard from "../ui/EachCard";

import styled from "styled-components";
import Ripple from "../ui/Ripple";

export const Button = styled.button`
	overflow: hidden;
	position: relative;
	cursor: pointer;
	padding: 5px 30px;
	text-align: center;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;

const Categores = () => {
	const [cat, setCat] = useState("action");

	const { error, data, status } = useQuery({
		queryKey: ["All-books"],
		queryFn: async () => {
			const x = await axios("/api/v1/books");
			return x.data.data.comics;
		},
	});

	return (
		<div className="w-[98%] mt-44 text-white font-mono pt-4 pb-4 xl:max-w-[80%] md:mx-auto">
			<div className="flex ml-2 gap-2 md:gap-4 text-xs md:text-lg lg:text-xl lg:gap-8">
				<Button
					className="p-1 lg:py-2 lg:px-4 uppercase rounder-md"
					onClick={() => setCat("action")}
					style={{
						backgroundColor: `${cat === "action" ? "#0179ca" : ""}`,
					}}
				>
					<Ripple duration={800} color="plum" />
					Action
				</Button>
				<Button
					className="p-1 lg:py-2 lg:px-4 uppercase rounder-md"
					onClick={() => setCat("adventure")}
					style={{
						backgroundColor: `${
							cat === "adventure" ? "#0179ca" : ""
						}`,
					}}
				>
					<Ripple duration={800} color="plum" />
					adventure
				</Button>
				<Button
					className="p-1 lg:py-2 lg:px-4 uppercase rounder-md"
					onClick={() => setCat("fantasy")}
					style={{
						backgroundColor: `${
							cat === "fantasy" ? "#0179ca" : ""
						}`,
					}}
				>
					<Ripple duration={800} color="plum" />
					fantasy
				</Button>
				<Button
					className="p-1 lg:py-2 lg:px-4 uppercase rounder-md"
					onClick={() => setCat("super-hero")}
					style={{
						backgroundColor: `${
							cat === "super-hero" ? "#0179ca" : ""
						}`,
					}}
				>
					<Ripple duration={800} color="plum" />
					mystery
				</Button>
				<Button
					className="p-1 lg:py-2 lg:px-4 uppercase rounder-md"
					onClick={() => setCat("humour")}
					style={{
						backgroundColor: `${cat === "humour" ? "#0179ca" : ""}`,
					}}
				>
					<Ripple duration={800} color="plum" />
					humour
				</Button>
			</div>

			{/* Elements */}

			<div className="my-16">
				<div className="text-white font-mono transition-all duration-1000  flex items-center justify-between">
					<h1 className="pl-4 text-2xl font-poppins text-wierdBlue font-bold md:text-3xl uppercase tracking-wide">
						{cat}
					</h1>
				</div>
				<div className="flex items-center flex-wrap gap-6 md:gap-10 ml-8 md:ml-4 last:justify-start justify-evenly">
					{data &&
						data.map((x) => {
							console.log(x.genre);
							if (x.genre === cat) {
								return (
									<EachCard
										key={x._id}
										Image={x.image}
										ratingsAverage={x.ratingsAverage}
										price={x.price}
										id={x._id}
										name={x.name}
										slug={x.slug}
									/>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
};

export default Categores;
