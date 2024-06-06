import * as React from 'react';
import styled from 'styled-components';
import EntryList from '../components/list-entries';
import Header from '../components/header';

const Home = () => {
    return (
        <>
            <Header />
            <p>Welcome. Here you can document awesome in-game tales, like epic battles or histories of in-game characters.</p>
            <p>Pick a document to edit an existing story, or click 'Create New' to start a new one!</p>
            <EntryList />
        </>
    );
}

export default Home;