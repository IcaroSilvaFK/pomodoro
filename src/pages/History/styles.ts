import styled, { css } from 'styled-components'

interface IStatusProps {
  statusColor: 'yellow' | 'red' | 'green'
}

export const Container = styled.div`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;

  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${({ theme }) => theme.colors.gray[600]};
      color: ${({ theme }) => theme.colors.gray[100]};
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;
      padding: 1rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${({ theme }) => theme.colors.gray[700]};
      border-top: 4px solid ${({ theme }) => theme.colors.gray[800]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

export const Status = styled.span<IStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;

    background: ${({ theme }) => theme.colors.red[500]};

    ${({ theme, statusColor }) =>
      statusColor === 'green' &&
      css`
        background: ${theme.colors.green[500]};
      `}
    ${({ theme, statusColor }) =>
      statusColor === 'red' &&
      css`
        background: ${theme.colors.red[500]};
      `}
      ${({ theme, statusColor }) =>
      statusColor === 'yellow' &&
      css`
        background: ${theme.colors.yellow[500]};
      `}
  }
`
