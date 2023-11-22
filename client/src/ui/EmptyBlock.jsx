import styled from "styled-components";

import PropTypes from "prop-types";

const StyledEmptyBlock = styled.div`
	padding: 2px 4px;
`;

function EmptyBlock({ message = "No data exists as of now !!!" }) {
	return <StyledEmptyBlock>{message}</StyledEmptyBlock>;
}

EmptyBlock.propTypes = {
	message: PropTypes.string,
};

export default EmptyBlock;
