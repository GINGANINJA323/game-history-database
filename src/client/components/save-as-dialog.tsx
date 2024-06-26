import * as React from 'react';
import styled from 'styled-components';

interface SaveAsDialogProps {
    handleSaveAs: (filename: string, isPrivate: boolean) => Promise<void>;
    handleClose: () => void;
}

const StyledDialog = styled.dialog`
    display: flex;
    flex-direction: column;
    width: 30%;
    z-index: 10;
`;

const SaveAsDialog = (props: SaveAsDialogProps) => {
    const { handleSaveAs, handleClose } = props;
    const [filename, setFilename] = React.useState('');
    const [isPrivate, setIsPrivate] = React.useState(false);

    return (
        <StyledDialog>
            <p>Filename</p>
            <input onChange={(e) => setFilename(e.target.value)} />
            <p>Private?</p>
            <input type='checkbox' onChange={(e) => setIsPrivate(e.target.checked)} />
            <button onClick={() => handleSaveAs(filename, isPrivate)}>Save File</button>
            <button onClick={handleClose}>Cancel</button>
        </StyledDialog>
    );
}

export default SaveAsDialog;