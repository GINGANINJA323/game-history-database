import * as React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div``;

const App = () => {
    return (
        <MainContainer>
            <h1>Game History DB</h1>
            <p>Welcome. Here you can document awesome in-game tales, like epic battles or histories of in-game characters.</p>
            <p>Pick a document to edit an existing story, or click 'Create New' to start a new one!</p>
        </MainContainer>
    );
}

export default App;