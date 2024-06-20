import fs from 'fs/promises';
import { ManifestType, NewDocumentDataType } from './types';
import { v4 as uuidv4 } from 'uuid';

const manifestPath = `${__dirname}/stored-docs/manifest.json`;

export const toFilename = (id: string, data: string): string => {
    return `${id}_${data.replace(' ', '_')}`;
}

export const getManifestFile = async(): Promise<ManifestType | null> => {
    try {
        const manifestRaw = await fs.readFile(manifestPath, { encoding: 'utf8' });
        const manifest = JSON.parse(manifestRaw);
        return manifest;
    } catch (e) {
        console.log('Failed to get manifest', e);
        return null;
    }
}

export const getFileAtPath = async(docPath: string): Promise<any | null> => {
    try {
        return fs.readFile(docPath, { encoding: 'utf8' });
    } catch (e) {
        console.log('Failed to get file', e);
        return null;
    }
}

export const writeNewFile = async(data: NewDocumentDataType): Promise<boolean> => {
    const { contents, displayName, author, isPublic } = data;

    // First, update the manifest
    const id = uuidv4();
    const docName = toFilename(id, displayName)
    const docPath = __dirname + `/stored-docs/${docName}.md`;
    const newManifest = await getManifestFile();

    try {
        if (!newManifest) {
            console.log('Failed to write new file - no manifest');
            return false;
        }

        newManifest[isPublic ? 'public' : 'private'][id] = {
            name: docName,
            displayName,
            author,
            created: new Date().toISOString(),
            updated: null,
            path: docPath
        }

        await fs.writeFile(manifestPath, JSON.stringify(newManifest));
        await fs.writeFile(docPath, contents);

        return true;
    } catch(e) {
        return false;
    }
}

export const writeExistingFile = async(id: string, contents: string, isPublic: boolean): Promise<boolean> => {
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

        const docPath = __dirname + `/stored-docs/${newManifest[manifestSection][id].name}`;

        await fs.writeFile(manifestPath, JSON.stringify(newManifest));
        await fs.writeFile(docPath, contents);

        return true;
    } catch (e) {
        console.log('Failed to write file', e);
        return false;
    }
}

export const deleteFile = async(id: string) => {
    try {
        const newManifest = await getManifestFile();

        if (!newManifest) {
            console.log('Failed to get manifest');
            return false;
        }

        const privateDocs = Object.keys(newManifest.private);
        const publicDocs = Object.keys(newManifest.public);

        let toDelete;

        if (privateDocs.find(e => e === id)) {
            toDelete = newManifest.private[id];
            delete newManifest.private[id];
        } if (publicDocs.find(e => e === id)) {
            toDelete = newManifest.public[id];
            delete newManifest.public[id];
        } else {
            console.log('Failed to find document');
            return false;
        }

        await fs.writeFile(manifestPath, JSON.stringify(newManifest));
        await fs.unlink(toDelete.path);
        console.log(newManifest);

        return true;
    } catch (e) {
        console.log('Error deleting file', e);
        return false;
    }
}