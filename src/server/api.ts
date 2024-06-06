import express from 'express';
const router = express.Router();
import { getManifestFile } from './utils';

router.get('/get-public-entries', async(req, res) => {
    // TODO: Once permissions are added, return only public entries
    const manifest = await getManifestFile();

    if (!manifest) {
        return res.status(500).send();
    }

    return res.status(200).json(manifest.public);
});

router.get('/get-entry-by-id', async(req, res) => {
    const manifest = await getManifestFile();

    if (!manifest) {
        return res.status(500).send();
    }

    if (manifest.public.map(e => e.id).includes(req.body.id)) {
        // entry is in public, return
        const file = manifest.public.find(e => e.id === req.body.id);

        if (!file) {
            return res.status(500).send();
        }

        const filePath = `${__dirname}/stored-docs${file.path}`;
        return res.status(200).sendFile(filePath);
    }

    // TODO: For private files, check the author against the user requesting to make sure they have access
})

export default router;