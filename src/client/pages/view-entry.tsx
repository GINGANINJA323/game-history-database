import * as React from 'react';
import styled from 'styled-components';

interface ViewEntryProps {
    entryId: string;
}

const ViewEntry = (props: ViewEntryProps) => {
    const { entryId } = props;

    const getEntry = async() => {
        const response  = await fetch(`/api/get-entry/${entryId}`);

        if (!response.ok) {
            console.log('Failed to get entry:', entryId);
            return;
        }

        
    }
}

export default ViewEntry;