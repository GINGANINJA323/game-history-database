import path from 'path';
import fs from 'fs/promises';

export const getManifestFile = async() => {
    try {
        const manifestRaw = await fs.readFile(__dirname + '/stored-docs/manifest.json', { encoding: 'utf8' });
        const manifest = JSON.parse(manifestRaw);
        return manifest;
    } catch (e) {
        console.log('Failed to get manifest', e);
        // @ts-ignore - Find right type for this
        throw new Error(e);
    }
}