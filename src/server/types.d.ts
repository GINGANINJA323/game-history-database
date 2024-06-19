export interface EntryType {
    displayName: string;
    name: string;
    author: string;
    path: string;
    created: string;
    updated: string | null;
}

export interface ManifestType {
    public: {
        [key: string]: EntryType;
    };
    private: {
        [key: string]: EntryType;
    }
}

export interface NewDocumentDataType {
    displayName: string,
    contents: string;
    author: string;
    isPublic: boolean;
}