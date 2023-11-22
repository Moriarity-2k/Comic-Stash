import { useNavigate } from "react-router-dom";

import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
	const navigate = useNavigate();

	return (
		<div className=" bg-white text-center divide-y divide-black text-gray-800 py-4 font-poppins mt-12">
			<div className="text-black py-4 flex items-center justify-center gap-8">
				<p className=" text-base md:text-3xl">
					{" "}
					Share Your Feedback or Just Say
				</p>
				<button
					onClick={() => navigate("/contactUs")}
					className=" bg-wierdBlue shadow-black shadow-sm hover:shadow-black transition-shadow duration-500 hover:shadow-md  text-slate-200 font-semibold text-sm py-2 px-4"
				>
					Hello
				</button>
			</div>
			<div className="text-center py-2">
				<AiOutlineCopyrightCircle className="inline mr-4" />
				<span>Comic Stash 2023. All rights reserved</span>
			</div>
		</div>
	);
}

export default Footer;
