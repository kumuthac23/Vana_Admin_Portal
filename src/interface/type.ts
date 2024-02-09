export interface ILogin {
    phoneNumber: string,
    password: string
}
export interface ICategory {
    _id?: string,
    name: string,
    description: string,
    image: string
}

export interface IUser {
    phoneNumber: string,
    password: string
}
export type CategoryDrawerProps = {
  isDrawerOpen: boolean;
  selectedCategory: ICategory | null;
  handleDrawerClose: () => void;
  isFetching: boolean;
};
export type JewelleryItemDrawerProps = {
    isDrawerOpen: boolean;
    selectedJewelleryITem: IProduct | null;
    handleDrawerClose: () => void;
}

  export interface IProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  netWeight: number;
  posterURL: string;
  JewelleryCollection: any[];
  collection: string; // Add the 'collection' property
}


export type DialogProps = {
    deleteDialogConfirmationOpen: boolean;
    handleDeleteCancel: () => void;
    handleDeleteClickConfirm: () => void;
};