import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    text: string;
    onClick: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled.button`
    height: 35px;
    border: none;
    border-radius: 5px;
    padding: 0px 10px;
`;

const Button = (props: ButtonProps) => {
    const { text, onClick } = props;

    return (
        // @ts-ignore - look up proper type for Event param
        <StyledButton onClick={onClick}>{text}</StyledButton>
    );
}

export default Button;