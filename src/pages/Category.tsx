import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ICategory } from "../interface/type";
import {
  useDeleteCategoryMutation,
  useGetAllCategory,
} from "../customHooksRQ/Category";
import CategoryDrawer from "./CategoryDrawer";
import CategoryDialogBox from "./CategoryDialogBox";
import Loader from "../common/Loader";

export const newCategory: ICategory = {
  _id: "",
  name: "",
  description: "",
  image: "",
};

const Category = () => {
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [deleteDialogConfirmationOpen, setdeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<ICategory | null>(null);

  const { data: CategoryData, isLoading, isFetching } = useGetAllCategory();

  const Categorys = CategoryData || [];

  const handleCategoryEditClick = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDrawerOpen(true);
  };

  const handleCategoryAddClick = () => {
    setSelectedCategory(newCategory);
    setIsDrawerOpen(true);
  };

  const handleCategoryDeleteClick = (category: ICategory) => {
    setDeleteConfirmation(category);
    setdeleteDialogConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setdeleteDialogConfirmationOpen(false);
  };

  const handleDeleteConfirmClick = async () => {
    setdeleteDialogConfirmationOpen(true);

    if (deleteConfirmation?._id) {
      await deleteCategoryMutation.mutateAsync(deleteConfirmation._id, {
        onError: (error) => console.log(error.message),
      });
      setDeleteConfirmation(null);
      setdeleteDialogConfirmationOpen(false);
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Categories</Typography>
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={handleCategoryAddClick}
              >
                + Add Category
              </Button>
            </Box>
            <TableContainer
              sx={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                marginTop: 3,
                height: "450px",
                position: "relative",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "ButtonFace",
                  }}
                >
                  <TableRow>
                    <TableCell align="center">IMAGE</TableCell>
                    <TableCell align="center">NAME</TableCell>
                    <TableCell align="center">DESCRIPTION</TableCell>
                    <TableCell align="center">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Categorys.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <img
                          width="50px"
                          src={`http://localhost:3000/category/images/${category.image}`}
                          alt={`${category.name}`}
                        />
                      </TableCell>
                      <TableCell align="center">{category.name}</TableCell>
                      <TableCell align="center">
                        {category.description}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleCategoryEditClick(category)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleCategoryDeleteClick(category)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          {deleteDialogConfirmationOpen && (
            <CategoryDialogBox
              deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
              handleDeleteCancel={handleDeleteCancel}
              handleDeleteClickConfirm={handleDeleteConfirmClick}
            />
          )}
          {isDrawerOpen && (
            <CategoryDrawer
              isDrawerOpen={isDrawerOpen}
              handleDrawerClose={() => setIsDrawerOpen(false)}
              selectedCategory={selectedCategory}
            />
          )}
        </>
      )}
    </>
  );
};

export default Category;
