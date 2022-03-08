import styled from "styled-components";

// export const StyledContainer = styled.div`
// 	display: flex;
// 	flex-wrap: wrap;
// 	align-items: center;
// 	height: 100vh;
// `;

export const StyledNote = styled.div`
	.active-class {
		position: fixed;
		// transition: 0.3s all ease-out;
		transition: var(--animationColor);
		background: var(--componentBgColor);
		// background: yellowgreen;
		box-shadow: var(--componentShadow);
		border-radius: 0.5rem;
		border: 1px solid var(--borderColor);
		z-index: -1;

		${({ active }) =>
			active
				? `
      width: 40vw !important;
     
	 padding:.5rem;

      height: 40vh !important;
      top: 45% !important;
      left: 50% !important; 
      transform: translate(-50%, -50%);
      z-index: 1;
      opacity: 1;
    `
				: `
      z-index: -1;
      transform: translate(0, 0);
      opacity: 0;
    `}
	}
`;
