import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background:${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
    min-height: 90vh;
    position: relative;
    display: grid;
    
    --componentBgColor:${({ theme }) => theme.componentBgColor};
    --componentTxtColor:${({ theme }) => theme.componentTxtColor};
    --componentShadow: rgba(0, 0, 0, 0.2) 0px 3px 5px 0px;
    --animationColor: all 0.50s linear;
    --bgColor:${({ theme }) => theme.componentBgColor};
    --primaryColor:${({ theme }) => theme.componentBgColor};
      transition:var(--animationColor);
  }


  .form.create-note{
    background:orange;
    color:red;
    transition:all 0.50s linear;
   }

  form.create-note input,
  form.create-note textarea {
    color: ${({ theme }) => theme.componentTxtColor};
    background:${({ theme }) => theme.componentBgColor};
    transition:var(--animationColor);
  }

  `;
