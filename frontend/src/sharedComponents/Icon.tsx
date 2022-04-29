import React from 'react'
import styled from 'styled-components'

// For More: https://fonts.google.com/icons

type IconProps = {
    name: 'mic' | 'delete' | 'close'
    onClick?: () => void
}

const Button = styled.button`
    border:0;
    background-color: transparent;
    cursor: pointer;

    > span {
        color: ${({theme}) => theme.FOREGROUND_TEXT };
    }
`

const Icon = ({ name, onClick }: IconProps) => {
    return (
        onClick ? (
            <Button onClick={onClick} type="button">
                <span className="material-symbols-outlined">
                    {name}
                </span>
            </Button>
        ) : (
            <span className="material-symbols-outlined">
                {name}
            </span>
        )
    )
}

export default Icon