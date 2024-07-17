import * as React from 'react';
import styled from 'styled-components';
import EntryList from '../components/list-entries';
import Header from '../components/header';
import { TextField } from '@mui/material';
import { ManifestObjectType } from '../types';

const Home = () => {
    const [search, setSearch] = React.useState('');
    const [entries, setEntries] = React.useState<ManifestObjectType>();

    const getEntries = async(): Promise<ManifestObjectType | undefined> => {
        const response = await fetch('/api/get-public-entries');

        if (!response.ok) {
            console.log('Failed to get entries');
            return;
        }

        const data = await response.json();
        console.log(Object.keys(data));
        setEntries(data);
    }

    const onChangeSearch = (searchTerm: string) => {
        setSearch(searchTerm.toLowerCase());
    }

    React.useEffect(() => {
        getEntries();
    }, []);

    return (
        <>
            <Header />
            <p>Welcome. Here you can document awesome in-game tales, like epic battles or histories of in-game characters.</p>
            <p>Pick a document to edit an existing story, or click 'Create New' to start a new one!</p>
            <TextField variant='outlined' label='Search Entries' onChange={(e) => onChangeSearch(e.target.value)} />
            <EntryList entries={entries} searchTerm={search} />
        </>
    );
}

export default Home;