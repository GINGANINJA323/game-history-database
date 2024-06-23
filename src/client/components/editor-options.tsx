import * as React from 'react';
import styled from 'styled-components';
import Button from './button';

const EditorOptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    border: 1px solid black;
    border-top: none;
    border-radius: 5px;
    align-self: center;
`;

const EditorButton = styled(Button)`
    margin: 10px;
    padding: 10px;
`;

interface EditorOptionsProps {
    onSave?: () => void;
    onSaveAs: () => void;
}

const EditorOptions = (props: EditorOptionsProps) => {
    const { onSave, onSaveAs } = props;
    return (
        <EditorOptionsContainer>
            {
                onSave ? <EditorButton text={'Save'} onClick={onSave} /> : null
            }
            <EditorButton text={'Save As'} onClick={onSaveAs} />
        </EditorOptionsContainer>
    );
}

export default EditorOptions;