import * as React from 'react';
import styled from 'styled-components';
import Button from './button';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>Game History DB</h1>
            <Button onClick={() => {}} text={'New entry'} />
        </HeaderContainer>
    );
}

export default Header;