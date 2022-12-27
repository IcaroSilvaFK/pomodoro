import { createGlobalStyle } from 'styled-components'

export const GlobalCSS = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box
  }

  :focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.green[500]};
  }

  html,border-style,#root{
    width: 100%;
    height: 100%;

    background:${({ theme }) => theme.colors.gray[900]};
    color:${({ theme }) => theme.colors.gray[300]};
    -webkit-font-smoothing: antialiased;
  }

  body,input,textarea, button{
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 400;
    font-size: 1rem;
  }

  button,input{
    border: 0;
    outline: 0;
    &:disabled {
      cursor: not-allowed;
    }
  }

  button{
    cursor: pointer;
  }

  a{
    text-decoration: none;
    color:inherit
  }
`
