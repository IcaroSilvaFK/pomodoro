import styled, { css } from 'styled-components'

interface IButtonCountdownProps {
  inCountdown?: boolean
}

export const Container = styled.main`
  width: 100%;
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;

  form {
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

      &[type='number']::-webkit-inner-spin-button,
      &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
      }

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray[500]};
      }

      &:focus {
        box-shadow: none;
        border-color: ${({ theme }) => theme.colors.green[500]};
      }
    }
  }
`

export const CountdownContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.robotoMono};
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme.colors.gray[100]};

  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme.colors.gray[700]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.green[500]};

  width: 4rem;
  overflow: hidden;

  display: flex;
  justify-content: center;
`

export const CountdownButton = styled.button<IButtonCountdownProps>`
  width: 100%;
  max-width: 40.5rem;
  max-height: 4rem;
  height: 100%;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.green[500]};
  color: ${({ theme }) => theme.colors.gray[100]};
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  transition: all linear 0.3s;

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.green[700]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.green[700]};
    opacity: 0.7;
  }

  ${({ inCountdown, theme }) =>
    inCountdown &&
    css`
      background: ${theme.colors.red[500]};

      &:hover {
        background: ${theme.colors.red[700]};
      }
      &:disabled {
        background: ${({ theme }) => theme.colors.red[700]};
        opacity: 0.7;
      }
    `}
`
