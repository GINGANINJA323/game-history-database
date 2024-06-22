// Lists the documents in the system.
// TODO: Once permissions are added, limit to only public and user documents. Consider adding a user documents feature and reuse this component.

import * as React from 'react';
import styled from 'styled-components';
import { EntryType } from '../types';
import NavigationContext from '../context/navigation-context';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { 
    usePopupState,
    bindTrigger,
    bindMenu
 } from 'material-ui-popup-state/hooks';

const EntryListContainer = styled.div`
    width: 100%;
`;

const Entry = styled.div`
    border: none;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
    background-color: #e9e9ed;
`;

const EntryButton = styled.button`
    width: 95%;
    border: none;
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
                popupState.close();
                return;
            } else {
                console.log('File deleted');
                popupState.close();
                window.location.reload();
                return;
            }
        } else {
            return;
        }
    }

    const renameEntry = async(id: string) => {
        const newName = window.prompt('Enter new filename:');

        if (!newName) {
            return;
        }

        const response = await fetch('/api/rename-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                newName
            })
        });

        if (!response.ok) {
            console.log('Failed to rename file');
            popupState.close();
            return;
        } else {
            console.log('File renamed');
            popupState.close();
            window.location.reload();
            return;
        }
    }

    React.useEffect(() => {
        getEntries();
    }, []);

    const popupState = usePopupState({ variant: 'popper' });

    return (
        <EntryListContainer>
            {
                entries ? Object.keys(entries).map(e => (
                        <Entry>
                            <EntryButton onClick={() => useNav({ pageName: 'view-entry', pageData: { entryId: e } })}>{entries[e].displayName}</EntryButton>
                            <IconButton {...bindTrigger(popupState)}>
                                <MoreVert />
                            </IconButton>
                            <Menu { ...bindMenu(popupState) }>
                                <MenuItem onClick={() => renameEntry(e)} >Rename Entry</MenuItem>
                                <MenuItem onClick={() => deleteEntry(e)} >Delete Entry</MenuItem>
                            </Menu>
                        </Entry>
                )) : null
            }
        </EntryListContainer>
    );
}

export default EntryList;