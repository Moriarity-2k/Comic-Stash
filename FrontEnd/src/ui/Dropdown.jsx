import { useState } from "react";
import { NavLink } from "react-router-dom";

function Dropdown({ user }) {
	// console.log(user);
	const [layer, setLayer] = useState(false);

	return (
		<div className="relative text-white inline-block text-left">
			<div>
				<button
					onClick={() => setLayer((x) => !x)}
					type="button"
					className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset hover:bg-gray-50 hover:text-wierdBlue"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
				>
					{user.name.split(" ")[0]}
					<svg
						className="-mr-1 h-5 w-5 "
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div
				style={{ opacity: `${layer ? 1 : 0}` }}
				className="absolute transition-all duration-500 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex="-1"
			>
				<div className="py-1" role="none">
					<NavLink
						to="/my-account"
						href="#"
						className="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabIndex="-1"
						id="menu-item-0"
					>
						My profile
					</NavLink>
					{user.role === "admin" && (
						<NavLink
							to="/admin-control"
							href="#"
							className="text-gray-700 block px-4 py-2 text-sm"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-0"
						>
						    Admin View
						</NavLink>
					)}
					<NavLink
						href="#"
						className="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabIndex="-1"
						id="menu-item-1"
					>
						Contact Us
					</NavLink>
					{/* <a
						href="#"
						className="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabIndex="-1"
						id="menu-item-2"
					>
						License
					</a> */}
					{/* <form method="POST" action="#" role="none">
						<button
							type="submit"
							className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-3"
						>
							Sign out
						</button>
					</form> */}
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
