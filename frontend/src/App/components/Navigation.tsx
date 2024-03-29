import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { StyledNavLink } from 'sharedComponents'

const StyledNav = styled.ul`
    list-style: none;
    margin: 2rem 0;
    padding: 0rem;
    display: flex;
    flex-direction: row;

    li {
        margin-left: 1rem;
    }
`

const ALWAYS_VISIBLE_LINKS = [
    { text: 'Todo Today', to: '/' },
    { text: 'Manage', to: '/manage' },
    { text: 'Settings', to: '/settings' },
]

const NavLi = styled.li`
    font-weight: ${(props: { isActive: boolean }) => {
        return props.isActive ? 700 : 100
    }};
`

const Navigation = () => {
    const location = useLocation()
    return (
        <StyledNav>
            {ALWAYS_VISIBLE_LINKS.map(({ text, to }) => (
                <NavLi key={to} isActive={location.pathname === to}>
                    <StyledNavLink to={to}>{text}</StyledNavLink>
                </NavLi>
            ))}
        </StyledNav>
    )
}
export default Navigation
