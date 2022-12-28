import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
  max-width: 40.5rem;

  input {
    background: transparent;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[400]};
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 1.125rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.colors.gray[100]};

    &:first-of-type {
      flex: 1;
    }

    &:last-of-type {
      max-width: 75px;
      text-align: center;
    }
    /* 
      &[type='number']::-webkit-inner-spin-button,
      &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
      } */

    &::-webkit-calendar-picker-indicator {
      display: none !important;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[500]};
    }

    &:focus {
      box-shadow: none;
      border-color: ${({ theme }) => theme.colors.green[500]};
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`
