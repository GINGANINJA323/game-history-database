import * as React from 'react';
import styled from 'styled-components';
import Home from './pages/home';
import ViewEntry from './pages/view-entry';

const MainContainer = styled.div``;

const App = () => {
    const [renderedPath, setRenderedPath] = React.useState('home');
    return (
        <MainContainer>
            {
                (() => {
                    switch(renderedPath) {
                        case 'home':
                            return <Home />
                        case 'view-entry':
                            return <ViewEntry entryId={1} />
                        default:
                            return <Home />
                    }
                })()
            }
        </MainContainer>
    );
}

export default App;