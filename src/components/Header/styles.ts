import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${({ theme }) => theme.colors.gray[100]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: all linear 0.3s;

      &:hover {
        border-bottom-color: ${({ theme }) => theme.colors.green[500]};
      }
      &.active {
        color: ${({ theme }) => theme.colors.green[500]};
      }
    }
  }
`
