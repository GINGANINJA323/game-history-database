import path from 'path';
import fs from 'fs/promises';
import { ManifestType } from './types';

export const getManifestFile = async(): Promise<ManifestType | null> => {
    try {
        const manifestRaw = await fs.readFile(__dirname + '/stored-docs/manifest.json', { encoding: 'utf8' });
        const manifest = JSON.parse(manifestRaw);
        return manifest;
    } catch (e) {
        console.log('Failed to get manifest', e);
        return null;
    }
}

export const getFileAtPath = async(docPath: string): Promise<any | null> => {
    try {
        return fs.readFile(__dirname + docPath, { encoding: 'utf8' });
    } catch (e) {
        console.log('Failed to get manifest', e);
        return null;
    }
}