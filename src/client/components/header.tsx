import * as React from 'react';
import styled from 'styled-components';
import Button from './button';
import NavigationContext from '../context/navigation-context';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
`;

const HeaderTitle = styled.h1`
    cursor: pointer;
`;

const Header = () => {
    const { useNav } = React.useContext(NavigationContext);
    return (
        <HeaderContainer>
            <HeaderTitle onClick={() => useNav({ pageName: 'home' })}>Game History DB</HeaderTitle>
            <Button onClick={() => {}} text={'New entry'} />
        </HeaderContainer>
    );
}

export default Header;