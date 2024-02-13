import { ICategory } from "../interface/type";
import {
  httpWithoutCredentials,
  httpWithMultipartFormData,
  } from "../services/http";

export const getAllCategory = async () => {
    try {
        const response = await httpWithoutCredentials.get<ICategory[]>("JewelleryCollection/getJewelleryCollection");
        return response.data;
    } catch (error) { throw error }
};

export const createCategory = async (newCategory: ICategory) => {
    console.log("create", newCategory);

    try {
        const response = await httpWithoutCredentials.post<ICategory>(
            "JewelleryCollection/validateAndCreateJewelleryCollection",
            newCategory
        );
        if (response.data && response.data._id) {
            return response.data;
        } else {
            throw new Error("Error while create category");
        }
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (updatedCategory: ICategory) => {
    console.log("api update", updatedCategory);

    const updateApi = `JewelleryCollection/updateJewelleryCollection/${updatedCategory._id}`;
    try {
        const response = await httpWithMultipartFormData.put(updateApi, updatedCategory);
        console.log(response);

        if (response.data && response.data._id) {

            return response.data;
        } else {
            throw new Error("Error while update category");
        }
    } catch (error) {
        console.error("Error in update  Category:", error);
        throw error;
    }
};

export const deleteCategory = async (id: string) => {
    const deleteApi = `JewelleryCollection/deleteJewelleryCollection/${id}`;
    try {
        await httpWithoutCredentials.delete(deleteApi);
        console.log("Category deleted successfully");
    } catch (error) {
        console.error("Error in delete Category:", error);
        throw error;
    }
};

