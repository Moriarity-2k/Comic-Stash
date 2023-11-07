import { AiOutlineCopyrightCircle } from "react-icons/ai";

import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";

function Footer() {
	return (
		<div className=" bg-white text-center text-gray-800 font-poppins mt-12">

			<div className="text-center py-4">
				<AiOutlineCopyrightCircle className="inline mr-4" />
				<span>Comic Stash 2023. All rights reserved</span>
			</div>

            {/* <div>
                This is a practise project
            </div> */}

			{/* <div className=" w-[90%] lg:max-w-[80%] mx-auto xl:max-w-[68%] space-y-8 p-6 rounded-sm py-12">
				<div className="flex gap-8">
                        <p className="capitalize tracking-widest text-grey-600 ">join our community</p>
					<a href="https://www.instagram.com/">
						<BiLogoFacebook className="text-3xl hover:rounded-full hover:border hover:border-[#fff] transition-all flex hover:text-[#000] hover:bg-[#fff]" />
					</a>
					<a href="https://twitter.com/login">
						<BiLogoTwitter className="text-3xl hover:rounded-full hover:border hover:border-[#fff] transition-all flex hover:text-[#000] hover:bg-[#fff]" />
					</a>
					<a href="https://in.linkedin.com/">
						<BiLogoLinkedin className="text-3xl hover:rounded-full hover:border hover:border-[#fff] transition-all flex hover:text-[#000] hover:bg-[#fff]" />
					</a>
				</div>
				<div>
					<AiOutlineCopyrightCircle className="inline mr-4" />
					<span>Comic Stash 2023. All rights reserved</span>
				</div>
				<div className="space-y-2">
					<strong className="text-xl">Disclaimer: </strong>
					<p className="text-sm tracking-wide capitalize">
						This is a practise project. I do not own any of the
						content featured here. If the conent belongs to you
						please feel free to contact.
					</p>
				</div>
			</div> */}
		</div>
	);
}

export default Footer;
