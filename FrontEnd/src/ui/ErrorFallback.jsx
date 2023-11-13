import styled from "styled-components";

const StyledErrorFallback = styled.main`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 4.8rem;
	flex: 0 1 96rem;
	text-align: center;

	& h1 {
		margin-bottom: 1.6rem;
	}

	& p {
		font-family: "Sono";
		margin-bottom: 3.2rem;
		color: var(--color-grey-500);
	}
`;
function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<StyledErrorFallback>
			<Box>
				<div className=" font-bold font-sans text-2xl">
					Something went wrong 🧐
				</div>
				<p>{error.message}</p>
				<button
					className="px-4 py-2 bg-wierdBlue text-white font-bold"
					onClick={resetErrorBoundary}
				>
					Try again
				</button>
			</Box>
		</StyledErrorFallback>
	);
}

export default ErrorFallback;
