import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
	return (
		<div className=" bg-white text-center text-gray-800 font-poppins mt-12">
			<div className="text-center py-4">
				<AiOutlineCopyrightCircle className="inline mr-4" />
				<span>Comic Stash 2023. All rights reserved</span>
			</div>
		</div>
	);
}

export default Footer;
