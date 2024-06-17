import express from 'express';
const router = express.Router();
import { getFileAtPath, getManifestFile } from './utils';

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

    if (manifest.public.map(e => e.id).includes(Number(id))) {
        // entry is in public, return
        const file = manifest.public.find(e => e.id === Number(id));

        if (!file) {
            return res.status(500).send();
        }

        const filePath = `/stored-docs${file.path}`;
        const fileContents = await getFileAtPath(filePath);

        if (!fileContents) {
            console.log('Failed to read file.');
            return res.status(500).send();
        }

        return res.status(200).send(fileContents);
    }

    // TODO: For private files, check the author against the user requesting to make sure they have access
})

export default router;