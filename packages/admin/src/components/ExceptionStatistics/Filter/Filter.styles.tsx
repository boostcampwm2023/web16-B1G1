import styled from '@emotion/styled';

export const FilterContainer = styled.div`
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

export const DateInputContainer = styled.div`
	background-color: ${(props) => props.color};
	width: 150px;
`;

export const DateInputTitle = styled.p`
	font-size: 1.5rem;
	border-bottom: 1px solid white;
`;

export const DateInput = styled.input`
	width: 128.75px;
`;
