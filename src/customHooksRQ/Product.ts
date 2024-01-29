import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllProduct, updateProduct } from "../services/Product";
import { IProduct } from "../interface/type";
import { queryClient } from "../App";
import toast from "react-hot-toast";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["ProductList"],
        queryFn: getAllProduct,
        refetchOnWindowFocus: false,
    });
};
export const useFetchJewelleryItemByJewelleryCollection = () => {

    return useQuery({
        queryKey: ["ProductList"],
        queryFn: getAllProduct,
        refetchOnWindowFocus: false,
    });
}

export const useCreateProductMutation = () => {
    const createProductMutation = useMutation({
        mutationFn: (newProduct: IProduct) => createProduct(newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ProductList"] });
            toast.success("Product created successfully");
        },
    });
    return createProductMutation;
};

export const useUpdateProductMutation = () => {
    const updateProductMutation = useMutation({
        mutationFn: (updatedProduct: IProduct) => {
            console.log(updatedProduct);
            return updateProduct(updatedProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ProductList"] });
            toast.success("Product updated successfully");
        },
    });

    return updateProductMutation;
};

export const useDeleteProductMutation = () => {
    const deleteProductMutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ProductList"] });
            toast.success("Product deleted successfully");
        },
    });
    return deleteProductMutation;
};