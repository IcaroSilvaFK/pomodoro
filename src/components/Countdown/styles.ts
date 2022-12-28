import styled from 'styled-components'

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
