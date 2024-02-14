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
import CategoryDrawer from "../drawer/CategoryDrawer";
import Loader from "../common/Loader";
import DeleteConfirmationDialogBox from "../common/DeleteConfirmationDialogBox";

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

  const {
    data: CategoryData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllCategory();

  const Categorys = CategoryData || [];

  const handleCategoryEditClick = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDrawerOpen(true);
  };

  const handleCategoryAddClick = () => {
    setSelectedCategory(newCategory);
    setIsDrawerOpen(true);
    refetch();
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
              <Box display={"flex"} alignItems={"center"} columnGap={1}>
                <Typography variant="h6">Collections</Typography>
                <Typography>({Categorys.length})</Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ textTransform: "none", color: "white" }}
                onClick={handleCategoryAddClick}
              >
                + Add Collection
              </Button>
            </Box>
            <TableContainer
              sx={{
                maxHeight: 600,
                height: "100%",
                marginTop: 3,
                position: "relative",
                lineheight: "none",
                overflowY: "auto",
              }}
            >
              <Table
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  tableLayout: "fixed",
                }}
              >
                <TableHead
                  sx={{
                    backgroundColor: "wheat",
                    height: selectedCategory ? "50px" : "auto",
                  }}
                >
                  <TableRow>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center" sx={{ width: 600 }}>
                      Description
                    </TableCell>
                    <TableCell align="center">Actions</TableCell>
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
            <DeleteConfirmationDialogBox
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
              isFetching={isFetching}
            />
          )}
        </>
      )}
    </>
  );
};

export default Category;
