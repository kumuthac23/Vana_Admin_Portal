import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct } from "../interface/type";
import { useDeleteProductMutation } from "../customHooksRQ/Product";
import { FetchJewelleryItemByJewelleryCollection } from "../services/Product";
import DeleteConfirmationDialogBox from "../common/DeleteConfirmationDialogBox";
import Loader from "../common/Loader";
import { useGetAllCategory } from "../customHooksRQ/Category";
import JewelleryItem from "../drawer/JewelleryItem";

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
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const {
    data: CollectionData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllCategory();

  const collections = CollectionData || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingProducts(true);
        const updatedProduct: IProduct = {
          _id: "", // Set the appropriate _id for the selected product
          title: "",
          images: [],
          price: 0,
          description: "",
          netWeight: 0,
          posterURL: "",
          JewelleryCollection: [], // Set the selected collection
        };
        console.log(selectedCollection);

        if (selectedCollection) {
          const result = await FetchJewelleryItemByJewelleryCollection(
            selectedCollection
          );
          setFilteredProducts(result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (selectedCollection) {
      fetchData();
    }
  }, [selectedCollection]);
  console.log(filteredProducts);

  const handleCollectionChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    setSelectedCollection(selectedValue);
  };

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

  const handleAddProductClick = () => {
    setSelectedProduct(newProduct);
    setIsDrawerOpen(true);
    refetch();
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilteredProducts([]);
    setSelectedCollection(null);
  };

  return (
    <>
      {isLoading || isFetching || loadingProducts ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Box>
                <Typography variant="h6">Products</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  onClick={handleAddProductClick}
                  sx={{ textTransform: "none" }}
                >
                  + Add Product
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FormControl
                sx={{
                  marginRight: 2,
                  width: "250px",
                }}
              >
                <Select
                  value={selectedCollection || ""}
                  onChange={handleCollectionChange}
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="" sx={{ display: "none" }}>
                    Select Collection
                  </MenuItem>

                  {collections.map((collection) => (
                    <MenuItem
                      key={collection._id}
                      value={collection._id}
                      sx={{
                        color:
                          selectedCollection === collection._id
                            ? "#bd8d67"
                            : "#333",
                      }}
                    >
                      {collection.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                onClick={handleClearSearch}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: "bolder",
                  height: "38px",
                  color: "#bd8d67",
                }}
              >
                Clear search
              </Button>
            </Box>
            <TableContainer
              sx={{
                // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                marginTop: 3,
                position: "relative",
                lineHeight: "none",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    position: "sticky",
                    zIndex: 1,
                    backgroundColor: "wheat",
                    lineHeight: "none",
                    height: selectedProduct ? "50px" : "auto",
                  }}
                >
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Images</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center" sx={{ width: 450 }}>
                      Description
                    </TableCell>
                    <TableCell align="center">Net Weight</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredProducts &&
                    filteredProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {product.title || null}
                        </TableCell>

                        <TableCell align="center">
                          {product.images &&
                            product.images.map((image, i) => (
                              <img
                                key={i}
                                src={image}
                                alt={`Product ${index + 1} Image ${i + 1}`}
                                style={{ marginRight: "5px" }}
                              />
                            ))}
                        </TableCell>
                        <TableCell align="center">
                          {product.price || null}
                        </TableCell>
                        <TableCell align="center">
                          {product.description || null}
                        </TableCell>
                        <TableCell align="center">
                          {product.netWeight || null}
                        </TableCell>
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
          {isDrawerOpen && (
            <JewelleryItem
              isDrawerOpen={isDrawerOpen}
              handleDrawerClose={() => setIsDrawerOpen(false)}
              selectedJewelleryITem={selectedProduct}
            />
          )}
        </>
      )}
    </>
  );
};

export default Product;
