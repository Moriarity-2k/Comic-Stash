import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import EachCard from "../ui/EachCard";

const Categores = () => {
	const [cat, setCat] = useState("action");

	const { error, data, status } = useQuery({
		queryKey: ["All-books"],
		queryFn: async () => {
			const x = await axios("http://localhost:3000/api/v1/books");
			return x.data.data.comics;
		},
	});

	return (
		// <div className="text-white font-mono  mt-12 w-[93%] mx-auto">
		<div className="w-[98%] mt-44 text-white font-mono pt-4 pb-4 xl:max-w-[80%] md:mx-auto">
			{/* humour action adventure fantasy mystery */}
			<div className="flex gap-8">
				{/* <h1>All Categories</h1> */}
				{/* <select
					className="bg-black border-wierdBlue px-4 py-2 border "
					value={cat}
					onChange={(e) => {
						console.log(e.target.value);
						setCat(e.target.value);
					}}
				>
					<option value="action">Action</option>
					<option value="adventure">Adventure</option>
					<option value="fantasy">Fantasy</option>
					<option value="super-hero">Mystery</option>
					<option value="humour">Humour</option>
				</select> */}
                
				<button className="py-2 px-4 uppercase text-base md:text-lg lg:text-xl rounded-full border-slate-300 border" onClick={() => setCat("action")}>Action</button>
				<button className="py-2 px-4 uppercase text-base md:text-lg lg:text-xl rounded-full border-slate-300 border" onClick={() => setCat("adventure")}>adventure</button>
				<button className="py-2 px-4 uppercase text-base md:text-lg lg:text-xl rounded-full border-slate-300 border" onClick={() => setCat("fantasy")}>fantasy</button>
				<button className="py-2 px-4 uppercase text-base md:text-lg lg:text-xl rounded-full border-slate-300 border" onClick={() => setCat("super-hero")}>super-hero</button>
				<button className="py-2 px-4 uppercase text-base md:text-lg lg:text-xl rounded-full border-slate-300 border" onClick={() => setCat("humour")}>humour</button>
			</div>

			{/* Elements */}

			<div className="my-16">
				<div className="text-white font-mono transition-all duration-1000  flex items-center justify-between">
					<h1 className="pl-4 text-2xl font-poppins text-wierdBlue font-bold md:text-3xl uppercase tracking-wide">
						{cat}
					</h1>
				</div>
				{/* <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4"> */}
				<div className="flex items-center flex-wrap gap-6 md:gap-10 ml-8 md:ml-4 last:justify-start justify-evenly">
					{data &&
						data.map((x) => {
							if (x.genre === cat) {
								return (
									<EachCard
										key={x._id}
										Image={x.image}
										ratingsAverage={x.ratingsAverage}
										price={x.price}
										id={x._id}
										name={x.name}
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
