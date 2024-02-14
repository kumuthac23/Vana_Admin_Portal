import { ICategory } from "../interface/type";
import { http } from "./http";

export const getAllCategory = async () => {
    try {
        const response = await http.get<ICategory[]>("JewelleryCollection/getJewelleryCollection");
        return response.data;
    } catch (error) { throw error }
};

export const createCategory = async (newCategory: FormData) => {
    console.log("create", newCategory);

    try {
        const response = await http.post<ICategory>(
          "JewelleryCollection/createJewelleryCollection",
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

export const updateCategory = async (updatedCategory: FormData) => {
    console.log("api update", updatedCategory);

    // const updateApi = `JewelleryCollection/updateJewelleryCollection/${updatedCategory._id}`;
    // try {
    //     const response = await http.put(updateApi, updatedCategory);
    //     console.log(response);

    //     if (response.data && response.data._id) {

    //         return response.data;
    //     } else {
    //         throw new Error("Error while update category");
    //     }
    // } catch (error) {
    //     console.error("Error in update  Category:", error);
    //     throw error;
    // }

    try {
      var id = updatedCategory.get("id");
      var response = await http.put<ICategory>(
        `JewelleryCollection/updateJewelleryCollection/${id}`,
        updatedCategory
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const deleteCategory = async (id: string) => {
    const deleteApi = `JewelleryCollection/deleteJewelleryCollection/${id}`;
    try {
        await http.delete(deleteApi);
        console.log("Category deleted successfully");
    } catch (error) {
        console.error("Error in delete Category:", error);
        throw error;
    }
};

