// import { useState } from "react";

// import { RiMenu2Line } from "react-icons/ri";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { FiHeart } from "react-icons/fi";
// import { MdOutlineAccountCircle } from "react-icons/md";

import ComicStash from "/Images/ComicStash_1.png";
// import SideBar from "./SideBar";
import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import { BiColor } from "react-icons/bi";

// import { RiMenuUnfoldLine } from "react-icons/ri";
// import { FaOutdent } from "react-icons/fa6";
// import { useState } from "react";

import { push as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Dropdown from "./Dropdown";

// import MainBg1 from "/Images/MainBg1.jpg";
// import SliderComp from "./SliderComp";

const StyledLi = styled.li`
	cursor: pointer;
	position: relative;
	// padding: 0.4rem 0.8rem;
	// background: white;
	// font-size: 1rem;
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
		// border-top: 0.18rem solid #ff4d5a;
		// border-left: 0.18rem solid #ff4d5a;
		border-left: 0.18rem solid #4b9cd3;
	}
	&:before {
		bottom: -1px;
		right: -1px;
		border-bottom: 0.18rem solid #4b9cd3;
		// border-bottom: 0.18rem solid #0179ca;
		// border-right: 0.18rem solid #0179ca;
		border-right: 0.18rem solid #4b9cd3;
	}
	&:hover {
		border-top-right-radius: 1px;
		border-bottom-left-radius: 1px;
		// background: var(--color-grey-100);
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
		// color : 'white'
	},
	bmBurgerBars: {
		// background: "#373a47",
		background: "#ffffffb4",
	},
	bmBurgerBarsHover: {
		// background: "#a90000",
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
		<header className="fixed top-0 left-0 w-[95%] z-10 py-6 px-4 font-poppins mx-auto">
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
								{/* My Account */}
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
						{/* <NavLink>
							<StyledLi
								style={{ boxShadow: "var(--shadow-sm)" }}
								className="list-none capitalize tracking-widest  py-2 px-4 md:py-2 md:px-4"
							>
								Contact Us
							</StyledLi>
						</NavLink> */}
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
					{/* <div className="flex relative mt-4 items-start basis-1/2 ">
						<FaOutdent className="text-xl text-[#ffffffbd]" />
						<ul className="bg-orange h-[100vh] w-full text-center">
                        <li>Home</li>
							<li>All categories</li>
							<li>My Account</li>
							<li>Login</li>
                            </ul>
                        </div> */}
					<Menu styles={styles} className="">
						<NavLink to="/" className="menu-item">
							Home
						</NavLink>
						<NavLink to="/categories" className="menu-item">
							All Categories
						</NavLink>
						{/* <NavLink to={} className="menu-item">Contact Us</NavLink> */}
						<NavLink to="/wishlist" className="menu-item">
							wish list
						</NavLink>
						<NavLink to="/wishlist" className="menu-item">
							cart
						</NavLink>
						{User.name ? (
							<NavLink className="menu-item" to="/my-account">
								{User.name}
							</NavLink>
						) : (
							<NavLink to="/login" className="menu-item">
								Sign In
							</NavLink>
						)}
					</Menu>
					<img src={ComicStash} className="h-14 basis-1/4" />
				</div>
			</div>
		</header>
	);
}

// home , all_categores , about , contact

export default Header;

// note:  Prev Big
{
	/* <div className="flex items-center justify-between py-2 ">
				<div className="flex gap-2 text-xl md:gap-4 lg:gap-6 items-center">
					<RiMenu2Line className="lg:hidden" onClick={sideValue} />
					<FiHeart className="lg:hidden" />
				</div>
				<img
					className="h-12 md:h-16 lg:h-18"
					src={ComicStash}
					alt="CartImage"
				/>
				<div className="flex gap-8 text-xs sm:text-md md:text-2xl font-bold text-[#fff]  md:gap-8 lg:gap-6 lg:text-base  items-center">
					<button className="flex items-center gap-4 bg-[#ff2534] rounded-full p-2 lg:py-2 lg:px-4">
						<span className="hidden lg:block ">Cart</span>
						<HiOutlineShoppingBag className="" />
					</button>
					<NavLink to="/my-account">
						<button className="flex items-center gap-4 bg-[#000] rounded-full p-2 lg:py-2 lg:px-4">
							<span className="hidden lg:block">Account</span>
							<MdOutlineAccountCircle className="" />
						</button>
					</NavLink>

					<button className="flex items-center gap-4 bg-[#000] rounded-full p-2 lg:py-2 lg:px-4">
						<span className="hidden lg:block">WIshList</span>
						<FiHeart className="" />
					</button>
				</div>
			</div> */
}
{
	/* <div className="text-xs md:text-sm lg:block lg:w-[90%] xl:w-[85%] 2xl:w-[70%] uppercase mx-auto mt-10">
				<ul className="flex justify-between items-center">
					<NavLink to="/">
						<StyledLi
							style={{ boxShadow: "var(--shadow-sm)" }}
							className="list-none tracking-widest  py-2 px-2 md:py-2 md:px-3"
						>
							Home
						</StyledLi>
					</NavLink>

					<StyledLi
						style={{ boxShadow: "var(--shadow-sm)" }}
						className="list-none tracking-widest py-2 px-2 md:py-2 md:px-3"
					>
						All Categories
					</StyledLi>
					<StyledLi
						style={{ boxShadow: "var(--shadow-sm)" }}
						className="list-none tracking-widest py-2 px-2 md:py-2 md:px-3"
					>
						About
					</StyledLi>
					<StyledLi
						style={{ boxShadow: "var(--shadow-sm)" }}
						className="list-none tracking-widest py-2 px-2 md:py-2 md:px-3"
					>
						Contact Us
					</StyledLi>
				</ul>
			</div> */
}
