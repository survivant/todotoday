import { NavLink, NavLinkProps } from 'react-router-dom'
import styled, { ThemedStyledProps } from 'styled-components'

const StyledNavLink = styled(NavLink)`
    color: ${(props) => {
        return props.theme.PRIMARY_BUTTON
    } };

`

export default StyledNavLink