import * as React from 'react';
import styled from 'styled-components';
import { MDXEditor, headingsPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import { PageDataType } from '../types';

interface ViewEntryProps {
    [key: string]: any;
}

const ViewEntry = (props: ViewEntryProps) => {
    const { entryId } = props;

    // TODO: Get a proper type for this
    const [file, setFile] = React.useState<any>();

    const getEntry = async() => {
        const response  = await fetch(`/api/get-entry-by-id/${entryId}`);

        if (!response.ok) {
            console.log('Failed to get entry:', entryId);
            return;
        }

        const data = await response.text();
        setFile(data);
    }

    React.useEffect(() => {
        getEntry();
    }, []);

    return (
        <>
            {
                file ? <MDXEditor markdown={file} plugins={[ headingsPlugin() ]} /> : <p>{`No file found for ID ${entryId}.`}</p>
            }
        </>
    )
}

export default ViewEntry;