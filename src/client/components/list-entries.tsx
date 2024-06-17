// Lists the documents in the system.
// TODO: Once permissions are added, limit to only public and user documents. Consider adding a user documents feature and reuse this component.

import * as React from 'react';
import styled from 'styled-components';
import { EntryType } from '../types';
import NavigationContext from '../context/navigation-context';

const EntryListContainer = styled.div``;

const Entry = styled.div``;

const EntryList = () => {
    const [entries, setEntries] = React.useState<EntryType[]>();
    const { useNav } = React.useContext(NavigationContext);
    const getEntries = async() => {
        const response = await fetch('/api/get-public-entries');

        if (!response.ok) {
            console.log('Failed to get entries');
            return;
        }

        const data = await response.json();
        setEntries(data);
    }

    React.useEffect(() => {
        getEntries();
    }, []);

    return (
        <EntryListContainer>
            {
                entries && entries.length ? entries.map(e => (
                    <Entry>
                        <button onClick={() => useNav({ pageName: 'view-entry', pageData: { entryId: e.id } })}>{e.displayName}</button>
                    </Entry>
                )) : null
            }
        </EntryListContainer>
    );
}

export default EntryList;