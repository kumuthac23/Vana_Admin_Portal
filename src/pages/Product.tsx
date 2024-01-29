import React, { useState } from "react";
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
import { IProduct } from "../interface/type"; // Import the IProduct interface
import {
  useDeleteProductMutation,
  useGetAllProducts,
} from "../customHooksRQ/Product"; // Import your custom hooks for product operations
import DeleteConfirmationDialogBox from "../common/DeleteConfirmationDialogBox";
import Loader from "../common/Loader";

const newProduct: IProduct = {
  title: "",
  images: [],
  price: 0,
  description: "",
  netWeight: 0,
  posterURL: "",
  JewelleryCollection: [],
};

const Product = () => {
  const deleteProductMutation = useDeleteProductMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<IProduct | null>(
    null
  );

  const {
    data: productData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllProducts();

  const products = productData || [];

  const handleProductEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleProductAddClick = () => {
    setSelectedProduct(newProduct);
    setIsDrawerOpen(true);
    refetch();
  };

  const handleProductDeleteClick = (product: IProduct) => {
    setDeleteConfirmation(product);
    setDeleteDialogConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogConfirmationOpen(false);
  };

  const handleDeleteConfirmClick = async () => {
    setDeleteDialogConfirmationOpen(true);

    if (deleteConfirmation?._id) {
      await deleteProductMutation.mutateAsync(deleteConfirmation._id, {
        onError: (error) => console.log(error.message),
      });
      setDeleteConfirmation(null);
      setDeleteDialogConfirmationOpen(false);
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
              <Typography variant="h6">Products</Typography>
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={handleProductAddClick}
              >
                + Add Product
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
                    <TableCell align="center">Images</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center" sx={{ width: "500px" }}>
                      Description
                    </TableCell>
                    <TableCell align="center">Price</TableCell>

                    <TableCell align="center">Net Weight</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product: IProduct, index: number) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {product.images.map((image, i) => (
                          <img
                            key={i}
                            src={image}
                            alt={`Product ${index + 1} Image ${i + 1}`}
                            style={{ width: "50px", marginRight: "5px" }}
                          />
                        ))}
                      </TableCell>{" "}
                      <TableCell align="center">{product.title}</TableCell>
                      <TableCell align="center">
                        {product.description}
                      </TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell align="center">{product.netWeight}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleProductEditClick(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleProductDeleteClick(product)}
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
          {/* {isDrawerOpen && (
            <ProductDrawer
              isDrawerOpen={isDrawerOpen}
              handleDrawerClose={() => setIsDrawerOpen(false)}
              selectedProduct={selectedProduct}
            />
          )} */}
        </>
      )}
    </>
  );
};

export default Product;
