import * as React from 'react';
import styled from 'styled-components';
import { MDXEditor, headingsPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Header from '../components/header';
import EditorOptions from '../components/editor-options';
import SaveAsDialog from '../components/save-as-dialog';

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
    const [file, setFile] = React.useState<any>('');
    const [dialogOpen, setDialogOpen] = React.useState(false);

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
        if (entryId) {
            getEntry();
        }
    }, []);

    const handleSaveFile = async() => {
        const response = await fetch('/api/save-file', {
            method: 'POST',
            body: JSON.stringify({
                id: entryId,
                contents: file
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Failed to save file');
            return;
        }

        console.log('File saved');
    }

    const handleSaveAs = async(filename: string, isPrivate: boolean) => {
        setDialogOpen(false);
        const response = await fetch('/api/save-new-file', {
            method: 'POST',
            body: JSON.stringify({
                displayName: filename,
                isPublic: !isPrivate,
                contents: file,
                author: 'Ed Glendinning'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Failed to save new file');
            return;
        }

        console.log('New file saved');
    }

    return (
        <ViewEntryContainer>
            <Header />
            {
                entryId && !file ?
                    <p>Failed to get entry</p> :
                    <EditorContainer>
                        <StyledEditor
                            markdown={file}
                            plugins={[ headingsPlugin() ]}
                            onChange={(content) => setFile(content)}
                        />
                        <EditorOptions onSave={handleSaveFile} onSaveAs={() => setDialogOpen(true)} />
                    </EditorContainer>
            }
            {
                dialogOpen ? <SaveAsDialog handleSaveAs={handleSaveAs}  /> : null
            }
        </ViewEntryContainer>
    )
}

export default ViewEntry;