import * as React from 'react';
import styled from 'styled-components';
import { PageDataType } from '../types';

interface ViewEntryProps {
    [key: string]: any;
}

const ViewEntry = (props: ViewEntryProps) => {
    const { entryId } = props;
    const [file, setFile] = React.useState();

    const getEntry = async() => {
        const response  = await fetch(`/api/get-entry/${entryId}`);

        if (!response.ok) {
            console.log('Failed to get entry:', entryId);
            console.log(response);
            return;
        }

        console.log(response);
        setFile(response);
    }

    React.useEffect(() => {
        getEntry();
    }, []);

    return (
        <>
            {
                file ? <p>There is a file</p> : <p>There is not a file...</p>
            }
        </>
    )
}

export default ViewEntry;