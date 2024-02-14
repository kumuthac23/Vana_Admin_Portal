export interface ILogin {
  phoneNumber: string;
  password: string;
}
export interface ICategory {
  _id?: string;
  name: string;
  description: string;
  image: string;
}

export interface IUser {
  phoneNumber: string;
  password: string;
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
};

export interface IProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  netWeight?: number;
  posterURL: string;
  JewelleryCollection: (string | undefined)[];
}

export type DialogProps = {
  deleteDialogConfirmationOpen: boolean;
  handleDeleteCancel: () => void;
  handleDeleteClickConfirm: () => void;
};

export type ProductByCollection = {
  _id: string;
  title: string;
  description: string;
  price: number;
  netWeight: number;
  posterURL: string;
  categoryName: string;
  JewelleryCollectionId: string[];
  images: string[];
  JewelleryCollection: ICategory[];
};
