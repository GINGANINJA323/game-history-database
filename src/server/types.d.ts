export interface EntryType {
    displayName: string;
    name: string;
    author: string;
    path: string;
    id: number;
    created: string;
}

export interface ManifestType {
    public: EntryType[];
}