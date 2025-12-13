export interface IModal {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    light?: 'light' | 'dark';
}

export interface IUseModal {
    modals: Array<IModal>;
    openModal: (title: string, content: React.ReactNode, light?: 'light' | 'dark') => void;
    closeModal: (index: number) => void;
    closeAllModals: () => void;
}