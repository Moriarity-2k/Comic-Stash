import {
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const ButtonCros = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens: opensWindowname }) {
	const { open } = useContext(ModalContext);
	console.log(opensWindowname);

	return cloneElement(children, { onClick: () => open(opensWindowname) });
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);
	// const ref = useOutsideClick(close);

    console.log(name)

	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && ref.current === e.target) {
					close();
				}
			}
			document.addEventListener("click", handleClick, true);

			return () =>
				document.removeEventListener("click", handleClick, true);
		},
		[close]
	);

	if (name !== openName) return null;

	return createPortal(
		<Overlay ref={ref}>
			<StyledModal className="md:w-[70%] lg:w-[60%] px-12 py-10">
				<ButtonCros onClick={close}>
					<HiXMark />
				</ButtonCros>
				<div>{cloneElement(children, { cancelButton: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
