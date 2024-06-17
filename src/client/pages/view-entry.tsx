import * as React from 'react';
import styled from 'styled-components';
import { MDXEditor, headingsPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Header from '../components/header';
import EditorOptions from '../components/editor-options';

// Currently setup solely as a housing for the editor, will implement a 'view' mode later.

// Loose type, as the pageData property is hard to transiently type.
interface ViewEntryProps {
    [key: string]: any;
}

const ViewEntryContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    border: 1px solid black;
    border-radius: 5px;
    align-self: center;
`;

const StyledEditor = styled(MDXEditor)`
    height: 75vh;
`

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

    // Immediately load the current document
    // TODO: Re-tool to work when no document is selected (a 'new' document);
    React.useEffect(() => {
        getEntry();
    }, []);

    const handleSaveFile = async() => {

    }

    const handleSaveAs = async() => {

    }

    return (
        <ViewEntryContainer>
            <Header />
            <EditorContainer>
                {
                    file ? 
                        <StyledEditor
                            markdown={file}
                            plugins={[ headingsPlugin() ]}
                            onChange={(content) => setFile(content)}
                        /> : <p>{`No file found for ID ${entryId}.`}</p>
                }
                <EditorOptions onSave={handleSaveFile} onSaveAs={handleSaveAs} />
            </EditorContainer>
        </ViewEntryContainer>
    )
}

export default ViewEntry;