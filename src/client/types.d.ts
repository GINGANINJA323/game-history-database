export interface EntryType {
    displayName: string;
    name: string;
    author: string;
    path: string;
    id: number;
}

export interface PageDataType {
    [key: string]: any;
}

export interface NavDataType {
    pageName: 'home' | 'view-entry',
    pageData?: PageDataType;
}

export interface NavigationContextType {
    useNav: (page: NavData) => void;
}

export interface ManifestObjectType {
    [key: string]: EntryType;
}