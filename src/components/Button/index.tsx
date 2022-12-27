import { HtmlHTMLAttributes } from 'react'

import { Container } from './styles'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface IButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
}

export function Button(props: IButtonProps) {
  const { variant, ...rest } = props

  return <Container variant={variant} {...rest}></Container>
}
