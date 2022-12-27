import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { Container } from './styles'

export function Header() {
  return (
    <Container>
      <img src="/assets/Logo.svg" alt="" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Container>
  )
}
