import express from 'express';
const router = express.Router();
import { deleteFile, getFileAtPath, getManifestFile, renameFile, writeExistingFile, writeNewFile } from './utils';

router.get('/get-public-entries', async(req, res) => {
    // TODO: Once permissions are added, return only public entries
    const manifest = await getManifestFile();

    if (!manifest) {
        return res.status(500).send();
    }

    return res.status(200).json(manifest.public);
});

router.get('/get-entry-by-id/:id', async(req, res) => {
    const manifest = await getManifestFile();

    if (!manifest) {
        return res.status(500).send();
    }

    const { id } = req.params;

    try {
        if (Object.keys(manifest.public).includes(id)) {
            // entry is in public, return
            const file = manifest.public[id];
    
            if (!file) {
                return res.status(500).send();
            }
    
            const fileContents = await getFileAtPath(file.path);
    
            if (!fileContents) {
                console.log('Failed to read file.');
                return res.status(500).send();
            }
    
            return res.status(200).send(fileContents);
        }
    } catch (e) {
        console.log("Failed to get entry", e);
        return res.status(500).send();
    }

    // TODO: For private files, check the author against the user requesting to make sure they have access
});

router.post('/save-file', async(req, res) => {
    // Fn to handle either updating a file or creating a new one.
    const manifest = await getManifestFile();

    if (!manifest) {
        return res.status(500).send();
    }

    const { id, contents } = req.body;

    const result = await writeExistingFile(id, contents, true);

    if (!result) {
        return res.status(500).send();
    }

    return res.status(200).send();
});

router.post('/save-new-file', async(req, res) => {
    // Fn to handle either updating a file or creating a new one.
    const manifest = await getManifestFile();

    if (!manifest) {
        return res.status(500).send();
    }

    const { contents, displayName, author, isPublic } = req.body;

    const result = await writeNewFile({
        contents,
        displayName,
        author,
        isPublic
    });

    if (!result) {
        return res.status(500).send();
    }

    return res.status(200).send();
});

router.post('/delete-file', async(req, res) => {
    if (!req.body.id) return res.status(400).send();
    
    const result = await deleteFile(req.body.id);

    if (!result) return res.status(500).send();

    return res.status(200).send();
});

router.post('/rename-file', async(req, res) => {
    if (!req.body.id || !req.body.newName) {
        return res.status(400).send();
    }

    const { id, newName } = req.body;

    const result = await renameFile(id, newName);

    if (!result) {
        return res.status(500).send();
    }

    return res.status(200).send();
});

export default router;