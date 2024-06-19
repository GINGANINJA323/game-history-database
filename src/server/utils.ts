import path from 'path';
import fs from 'fs/promises';
import { ManifestType, NewDocumentDataType } from './types';
import { v4 as uuidv4 } from 'uuid';

export const toFilename = (data: string): string => {
    return data.replace(' ', '_');
}

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

export const writeNewFile = async(data: NewDocumentDataType): Promise<boolean> => {
    const { contents, displayName, author, isPublic } = data;

    // First, update the manifest
    const docPath = __dirname + `/stored-docs/${name}`;
    const newManifest = await getManifestFile();
    const id = uuidv4();

    try {
        if (!newManifest) {
            console.log('Failed to write new file - no manifest');
            return false;
        }

        newManifest[isPublic ? 'public' : 'private'][id] = {
            name: toFilename(displayName),
            displayName,
            author,
            created: new Date().toISOString(),
            updated: null,
            path: docPath
        }

        await fs.writeFile(`${__dirname}/stored-docs/manifest.json`, JSON.stringify(newManifest));
        await fs.writeFile(docPath, contents);

        return true;
    } catch(e) {
        return false;
    }
}

export const writeExistingFile = async(id: string, contents: string, isPublic: boolean): Promise<boolean> => {
    const docPath = __dirname + `/stored-docs/${name}`;
    const newManifest = await getManifestFile();
    const manifestSection = isPublic ? 'public' : 'private';

    try {
        if (!newManifest || !newManifest[manifestSection][id]) {
            console.log('Failed to get manifest file');
            return false;
        } 

        newManifest[manifestSection][id] = {
            ...newManifest[manifestSection][id],
            updated: new Date().toISOString()
        }

        await fs.writeFile(`${__dirname}/stored-docs/manifest.json`, JSON.stringify(newManifest));
        await fs.writeFile(docPath, JSON.stringify(contents));

        return true;
    } catch (e) {
        console.log('Failed to write file', e);
        return false;
    }
}