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

export default router;