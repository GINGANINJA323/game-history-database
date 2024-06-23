import * as React from 'react';
import styled from 'styled-components';
import { MDXEditor, headingsPlugin, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Header from '../components/header';
import EditorOptions from '../components/editor-options';
import SaveAsDialog from '../components/save-as-dialog';
import { toast } from 'react-toastify';

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
    overflow: scroll;
`;

// const StyledEditor = styled(MDXEditor)`
//     height: 75vh;
// `

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
        console.log('handleSaveFile called')
        await toast.promise(fetch('/api/save-file', {
            method: 'POST',
            body: JSON.stringify({
                id: entryId,
                contents: file
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }), {
            pending: 'Saving file...',
            success: 'File saved!',
            error: 'Failed to save file!'
        });
    }

    const handleSaveAs = async(filename: string, isPrivate: boolean) => {
        setDialogOpen(false);
        await toast.promise(fetch('/api/save-new-file', {
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
        }), {
            pending: 'Saving file...',
            success: 'File saved!',
            error: 'Failed to save file!'
        });
    }

    return (
        <ViewEntryContainer>
            <Header />
            {
                entryId && !file ?
                    <p>Failed to get entry</p> :
                    <>
                        <EditorContainer>
                        <MDXEditor
                            markdown={file}
                            plugins={[ headingsPlugin(), toolbarPlugin({
                                toolbarContents: () => (
                                    <>
                                        <UndoRedo />
                                        <BoldItalicUnderlineToggles />
                                    </>
                                )
                            })
                        ]}
                            onChange={(content) => setFile(content)}
                        />
                        </EditorContainer>
                        <EditorOptions onSave={entryId ? handleSaveFile : undefined} onSaveAs={() => setDialogOpen(true)} />
                    </>
            }
            {
                dialogOpen ? <SaveAsDialog handleClose={() => setDialogOpen(false)} handleSaveAs={handleSaveAs}  /> : null
            }
        </ViewEntryContainer>
    )
}

export default ViewEntry;