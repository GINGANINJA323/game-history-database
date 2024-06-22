import * as React from 'react';
import styled from 'styled-components';
import Home from './pages/home';
import ViewEntry from './pages/view-entry';
import NavigationContext from './context/navigation-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavDataType } from './types';

const MainContainer = styled.div``;

const App = () => {
    const [renderedPath, setRenderedPath] = React.useState<NavDataType>({ pageName: 'home', pageData: {} });

    return (
        <NavigationContext.Provider value={{ useNav: setRenderedPath }}>
            <MainContainer>
                {
                    (() => {
                        switch(renderedPath.pageName) {
                            case 'home':
                                return <Home />
                            case 'view-entry':
                                return <ViewEntry { ...renderedPath.pageData } />
                            default:
                                return <Home />
                        }
                    })()
                }
            </MainContainer>
            <ToastContainer autoClose={5000} />
        </NavigationContext.Provider>
    );
}

export default App;