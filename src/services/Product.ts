import { IProduct } from "../interface/type";
import { http } from "./http";

export const getAllProduct = async () => {
    try {
        const response = await http.get<IProduct[]>("JewelleryItem/getAllJewelleryItem");
        return response.data;
    } catch (error) { throw error }
};

export const createProduct = async (newProduct: IProduct) => {

    try {
        const response = await http.post<IProduct>(
            "JewelleryItem/createJewelleryItem",
            newProduct
        );
        if (response.data) {
            return response.data;
        } else {
            throw new Error("Error while create Product");
        }
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (updatedProduct: IProduct) => {
    console.log("api update", updatedProduct);

    const updateApi = `JewelleryItem/updateJewelleryItem/${updatedProduct._id}`;
    try {
        const response = await http.put(updateApi, updatedProduct);
        console.log(response);

        if (response.data && response.data._id) {

            return response.data;
        } else {
            throw new Error("Error while update Product");
        }
    } catch (error) {
        console.error("Error in update  Product:", error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    const deleteApi = `JewelleryItem/deleteJewelleryItem/${id}`;
    try {
        await http.delete(deleteApi);
        console.log("Product deleted successfully");
    } catch (error) {
        console.error("Error in delete Product:", error);
        throw error;
    }
};

export const FetchJewelleryItemByJewelleryCollection = async (updatedProduct: string) => {
    try {
        console.log(updatedProduct);

        const response = await http.get<IProduct[]>(`JewelleryItem/fetchJewelleryItemsByJewelleryCollectionId/${updatedProduct}`);
        console.log(response.data);

        return response.data;
    } catch (error) { throw error }
}