export interface ILogin {
    phoneNumber: string,
    password: string
}
export interface ICategory {
    _id?: string,
    name: string,
    description: string,
    image?: string
}
export type CategoryDrawerProps = {
    isDrawerOpen: boolean;
    selectedCategory: ICategory | null;
    handleDrawerClose: () => void;
}

export type IProduct = {
    _id?: string,
    title: string,
    images: string[],
    price: number,
    description: string,
    netWeight: number,
    posterURL: string,
    JewelleryCollection: string[]
}
export type DialogProps = {
    deleteDialogConfirmationOpen: boolean;
    handleDeleteCancel: () => void;
    handleDeleteClickConfirm: () => void;
};