import styled from "styled-components";

const HoverContainer = styled.li`
	width: max-content;
    list-style-type : none;
`;

const HoverText = styled.h3`
	--b: 0.1em;
	--c: #ff4d5a;

	color: black;
	font-family: Nunito;

	padding-block: var(--b);
	background: linear-gradient(var(--c) 50%, #000 0) 0%
			calc(100% - var(--\_p, 0%)) / 100% 200%,
		linear-gradient(var(--c) 0 0) 0% var(--\_p, 0%) / var(--\_p, 0%)
			var(--b) no-repeat;
	-webkit-background-clip: text, padding-box;
	background-clip: text, padding-box;
	transition: 0.3s var(--\_s, 0s) linear,
		background-size 0.3s calc(0.3s - var(--\_s, 0s));
	&:hover {
		--\_p: 100%;
		--\_s: 0.3s;
	}
`;

function HoverEffect({ children }) {
	return (
		<HoverContainer className="hover-3-cover">
			<HoverText className="hover-3 text-lg font-semibold cursor-pointer">{children}</HoverText>
		</HoverContainer>
	);
}

export default HoverEffect;
