// Lists the documents in the system.
// TODO: Once permissions are added, limit to only public and user documents. Consider adding a user documents feature and reuse this component.

import * as React from 'react';
import styled from 'styled-components';
import { EntryType } from '../types';
import NavigationContext from '../context/navigation-context';

const EntryListContainer = styled.div`
    width: 100%;
`;

const Entry = styled.button`
    border: none;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
`;

const EntryList = () => {
    const [entries, setEntries] = React.useState<{ [key: string]: EntryType }>();
    const { useNav } = React.useContext(NavigationContext);
    const getEntries = async() => {
        const response = await fetch('/api/get-public-entries');

        if (!response.ok) {
            console.log('Failed to get entries');
            return;
        }

        const data = await response.json();
        console.log(Object.keys(data));
        setEntries(data);
    }

    const deleteEntry = async(id: string) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            const response = await fetch('/api/delete-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });

            if (!response.ok) {
                console.log('Failed to delete file');
                return;
            } else {
                console.log('File deleted');
                return;
            }
        } else {
            return;
        }
    }

    React.useEffect(() => {
        getEntries();
    }, []);

    return (
        <EntryListContainer>
            {
                entries ? Object.keys(entries).map(e => (
                        <div>
                            <Entry onClick={() => useNav({ pageName: 'view-entry', pageData: { entryId: e } })}>{entries[e].displayName}</Entry>
                            <button onClick={() => deleteEntry(e)} >Delete Entry</button>
                        </div>
                )) : null
            }
        </EntryListContainer>
    );
}

export default EntryList;