import { push as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ComicStash from "/Images/ComicStash_1.png";
import Dropdown from "./Dropdown";

const StyledLi = styled.li`
	cursor: pointer;
	position: relative;
	// border-top-right-radius: 10px;
	// border-bottom-left-radius: 10px;
	transition: all 1s;
	&:after,
	&:before {
		content: " ";
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		border: 0px solid #fff;
		transition: all 1s;
	}
	&:after {
		top: -1px;
		left: -1px;
		border-top: 0.18rem solid #4b9cd3;
		border-left: 0.18rem solid #4b9cd3;
	}
	&:before {
		bottom: -1px;
		right: -1px;
		border-bottom: 0.18rem solid #4b9cd3;
		border-right: 0.18rem solid #4b9cd3;
	}
	&:hover {
		border-top-right-radius: 1px;
		border-bottom-left-radius: 1px;
		&:before,
		&:after {
			width: 101%;
			height: 101%;
		}
	}
`;

var styles = {
	bmBurgerButton: {
		position: "fixed",
		width: "2.2rem",
		height: "1.6rem",
		left: "36px",
		top: "36px",
	},
	bmBurgerBars: {
		background: "#ffffffb4",
	},
	bmBurgerBarsHover: {
		background: "#ff4d5a",
	},
	bmCrossButton: {
		height: "2.3rem",
		width: "24px",
	},
	bmCross: {
		background: "#ff4d5a",
		backdropFilter: "blur(13px)",
	},
	bmMenuWrap: {
		position: "fixed",
		height: "100%",
	},
	bmMenu: {
		// background: "#373a47",
		padding: "2.5em 1.5em 0",
		fontSize: "1.15em",
		// fontWeight: "bold",
		fontFamily: "mono",
		letterSpacing: "0.1rem",
		backdropFilter: "blur(13px)",
	},
	bmMorphShape: {
		// fill: "#373a47",
	},
	bmItemList: {
		color: "#b8b7ad",
		padding: "0.8em",
	},
	bmItem: {
		display: "block",
		borderBottom: "1px solid #ff4d5a",
		fontSize: "1.2rem",
		marginBottom: "2rem",
	},
	bmOverlay: {
		// background: "rgba(0, 0, 0, 0.3)",
		// backdropFilter : 'blur(13px)'
	},
};

function Header() {
	const User = useSelector((state) => state.userReducer);

	return (
		<header className="fixed top-0 left-0 w-[95%] z-10 py-6 px-4 font-poppins ml-8">
			<div className="hidden md:block sticky top-4">
				<div className="w-full h-full absolute bg-transparent backdrop-blur-sm -z-10"></div>
				<div className="flex justify-between items-center">
					<NavLink to="/">
						<img src={ComicStash} className="md:h-12 lg:h-full" />
					</NavLink>
					<ul className="flex md:text-sm gap-3 lg:text-base lg:gap-6 xl:gap-8 items-center text-[#fff] font-mono tracking-wider">
						<NavLink to="/">
							<StyledLi
								style={{ boxShadow: "var(--shadow-sm)" }}
								className="list-none tracking-widest py-2 px-2 lg:py-2 lg:px-4"
							>
								Home
							</StyledLi>
						</NavLink>
						<NavLink to="/categories">
							<StyledLi
								style={{ boxShadow: "var(--shadow-sm)" }}
								className="list-none tracking-widest  py-2 px-4 md:py-2 md:px-4"
							>
								Categories
							</StyledLi>
						</NavLink>
						<NavLink to="/wishlist">
							<StyledLi
								style={{ boxShadow: "var(--shadow-sm)" }}
								className="list-none tracking-widest  py-2 px-4 md:py-2 md:px-4"
							>
								wishlist
							</StyledLi>
						</NavLink>
						<NavLink to="/cart">
							<StyledLi
								style={{ boxShadow: "var(--shadow-sm)" }}
								className="list-none tracking-widest  py-2 px-4 md:py-2 md:px-4"
							>
								cart
							</StyledLi>
						</NavLink>
						{User && User.name ? (
							<Dropdown user={User} />
						) : (
							<NavLink to="/login">
								<StyledLi
									style={{ boxShadow: "var(--shadow-sm)" }}
									className="list-none capitalize tracking-widest  py-2 px-4 md:py-2 md:px-4"
								>
									sign in
								</StyledLi>
							</NavLink>
						)}
					</ul>
				</div>
			</div>

			<div className="md:hidden text-white">
				<div className="flex items-start justify-between">
					<Menu styles={styles} className="">
						<NavLink to="/" className="menu-item">
							Home
						</NavLink>
						<NavLink to="/categories" className="menu-item">
							All Categories
						</NavLink>
						<NavLink to="/wishlist" className="menu-item">
							wish list
						</NavLink>
						<NavLink to="/wishlist" className="menu-item">
							cart
						</NavLink>
						{User?.name ? (
							<NavLink className="menu-item" to="/my-account">
								{User.name}
							</NavLink>
						) : (
							<NavLink to="/login" className="menu-item">
								Sign In
							</NavLink>
						)}
						{(User?.role === "admin" || User.role === "owner") && (
							<NavLink to="/admin-control">Admin View</NavLink>
						)}
					</Menu>
					<img src={ComicStash} className="h-14 basis-1/4" />
				</div>
			</div>
		</header>
	);
}

export default Header;
