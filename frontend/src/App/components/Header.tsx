import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Heading } from 'sharedComponents'

const HeaderWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
`

// const FunHeaderWrapper = styled.div`
//     height: 2rem;
//     position: relative;
//     width: 100%;
//     display: block;
//     ${Heading.H1}{
//         position: absolute;
//         left: 0;
//         top: 0;
//         width: 100%;
//         white-space: nowrap;
//         display: block;
//         opacity: 0.9;
//     }

//     ${Heading.H1}:nth-child(1){
//         left: 0px;
//         top: 0px;
//         color: ${({ theme }) => theme.DISABLED};
//     }
    
//     ${Heading.H1}:nth-child(2){
//         left: -2px;
//         top: -2px;
//         color: ${({ theme }) => theme.FOREGROUND};
//     }

//     ${Heading.H1}:nth-child(3){
//         left: -4px;
//         top: -4px;
//         color: ${({ theme }) => theme.INTERACTION};
//     }

//     ${Heading.H1}:nth-child(4){
//         left: 2px;
//         top: 2px;
        
//         color: ${({ theme }) => theme.WARNING};
//     }


// const FunHeader = () => {
//     return (
//         <FunHeaderWrapper>
//             <Heading.H1>
//                 Todo Today
//             </Heading.H1>
//             <Heading.H1>
//                 Todo Today
//             </Heading.H1>
//             <Heading.H1>
//                 Todo Today
//             </Heading.H1>
//             <Heading.H1>
//                 Todo Today
//             </Heading.H1>
//         </FunHeaderWrapper>
//     )
// }

const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <Heading.H1>Todo Today</Heading.H1>
                </Link>
            </div>
        </HeaderWrapper>
    )
}

export default Header
