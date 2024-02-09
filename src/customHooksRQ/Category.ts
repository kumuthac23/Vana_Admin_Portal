import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../services/CategoryApi";
import { ICategory } from "../interface/type";
import { queryClient } from "../App";
import toast from "react-hot-toast";

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["categoryList"],
    queryFn: getAllCategory,
    refetchOnWindowFocus: false,
  });
};

export const useCreateCategoryMutation = () => {
  const createCategoryMutation = useMutation({
    // mutationFn: (newCategory: ICategory) => createCategory(newCategory),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    //   toast.success("Category created successfully");
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return createCategoryMutation;
};

export const useUpdateCategoryMutation = () => {
//   const updateCategoryMutation = useMutation({
//     mutationFn: (updatedCategory: ICategory) => {
//       console.log(updatedCategory);
//       return updateCategory(updatedCategory);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categoryList"] });
//       toast.success("Category updated successfully");
//     },
    //   });
      const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      },
      onError: (error) => {
        console.log(error);
      },
    });

//   return updateCategoryMutation;
};

export const useDeleteCategoryMutation = () => {
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
      toast.success("Category deleted successfully");
    },
  });
  return deleteCategoryMutation;
};
