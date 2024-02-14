import React, { useRef } from "react";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { ProductInitialValue } from "../constants/IntialValues";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { SlideProps } from "@mui/material/Slide";
import imageCompression from "browser-image-compression";
import * as yup from "yup";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../customHooksRQ/Product";

import { ICategory, IProduct } from "../interface/type";
import { useSnackBar } from "../context/SnackBarContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllCategory } from "../services/CategoryApi";

interface IProps {
  selectedProduct: IProduct;
  dialogOpen: boolean;
  onCloseDialog(): void;
}

const Transition = React.forwardRef(function Transition(
  props: React.PropsWithChildren<SlideProps>,
  ref: React.Ref<unknown>
) {
  const { children, ...restProps } = props;
  return (
    <Slide direction="left" ref={ref} {...restProps}>
      {children}
    </Slide>
  );
});
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  netWeight: yup.number().required("Net Weight is required"),
  posterURL: yup.string().required("Poster URL is required"),
  images: yup.array().of(yup.string()),
  collection: yup.object().required(),
});

function ProductDialog(props: IProps) {
  const {
    dialogOpen: ProductdialogOpen,
    onCloseDialog,
    selectedProduct,
  } = props;

  const formRef = useRef(null);
  const [collections, setCollections] = useState<ICategory[]>([]);
  const [product, setProduct] = useState<IProduct>(ProductInitialValue);
  const [isEdit, setIsEdit] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory[]>([]);
  const [newProductUplodedImages, setNewProductUploadImages] = useState<File[]>(
    []
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPosterImage, setSelectedPosterImage] = useState<string | null>(
    null
  );
  const [productUploadedImages, setProductuploadedImages] = useState<string[]>(
    []
  );
  const [uploadedImageHoveredIndex, setUploadedImageHoverIndex] = useState<
    number | null
  >(null);
  const [newPosterImageFile, setNewPosterImageFile] = useState<File | null>(
    null
  );

  const [removedProductImages, setRemovedProductImages] = useState<string[]>(
    []
  );

  const [isPosterUploading, setIsPosterUploading] = useState(false);
  const [isImagesUploading, setIsImagesUploading] = useState(false);

  const fileImageRef = useRef<HTMLInputElement>(null);
  const filePosterRef = useRef<HTMLInputElement>(null);

  var productCreateMutation = useCreateProductMutation();
  var updateProductMutation = useUpdateProductMutation();

  // const { data: categoryList } = useGetAllCategory();
  const { updateSnackBarState } = useSnackBar();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>({
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
    if (selectedProduct && selectedProduct._id) {
      setIsEdit(true)
      setProduct({ ...selectedProduct });
      // if (selectedProduct.images && Array.isArray(selectedProduct.images)) {
      //   setNewProductUploadImages([...selectedProduct.images]);
      // }
      if (selectedProduct.posterURL) {
        if (typeof selectedProduct.posterURL === "string") {
          setSelectedPosterImage(selectedProduct.posterURL);
        } else {
          setSelectedPosterImage("");
        }
      }
    }
  }, [selectedProduct]);

  // useEffect(() => {
  //   if (selectedProduct && selectedProduct._id) {
  //     setIsEdit(true);
  //     setProduct({ ...selectedProduct });

  //     reset({
  //       title: selectedProduct.title,
  //       price: selectedProduct.price,
  //       description: selectedProduct.description,
  //       netWeight: selectedProduct.netWeight,

  //       images: selectedProduct.images || [],
  //       posterURL: selectedProduct.posterURL || "",
  //       JewelleryCollection: selectedProduct.JewelleryCollection || [],
  //     });
  //     console.log("Selected categories:", selectedProduct.JewelleryCollection);

  //     setSelectedCategory(selectedProduct.JewelleryCollection || []);
  //   }
  // }, [selectedProduct, reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategory();

        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
        updateSnackBarState(true, "Error fetching collections.", "error");
      }
    };

    fetchData();
  }, []);

  const resetForm = () => {
    setProduct({ ...ProductInitialValue });
    setIsEdit(false);

    setSelectedPosterImage("");
    setNewProductUploadImages([]);
    setSelectedCategory([]);
    setProductuploadedImages([]);
    setNewPosterImageFile(null);
    setRemovedProductImages([]);
  };

  const handleCloseDialog = () => {
    resetForm();
    onCloseDialog();
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setIsImagesUploading(true);
      const filesArray: File[] = Array.from(files);
      const validFiles = filesArray.filter(
        (file) =>
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
      );

      const compressedFiles = await Promise.all(
        validFiles.map((file) => handleCompressFile(file))
      );

      const compressedValidFiles = compressedFiles.filter(
        (compressedFile) => compressedFile !== undefined
      ) as File[];

      setNewProductUploadImages([
        ...newProductUplodedImages,
        ...compressedValidFiles,
      ]);

      setIsImagesUploading(false);
    } else {
      console.log(
        "Invalid file format. Please select a JPEG or PNG or JPG file."
      );
    }
  };

  const handlePreviewClick = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const handleImagesButtonClick = () => {
    if (fileImageRef.current) {
      fileImageRef.current.click();
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...newProductUplodedImages];
    updatedImages.splice(index, 1);
    setNewProductUploadImages(updatedImages);
    setHoveredIndex(null);
  };

  const handlePosterButtonClick = () => {
    if (filePosterRef.current) {
      filePosterRef.current?.click();
    }
  };

  async function handleCompressFile(event: File): Promise<File | undefined> {
    const imageFile = event;

    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    // Check if the image size is above 1 MB
    if (imageFile.size > 1024 * 1024) {
      // Reduce the maxSizeMB to compress the image to approximately 500 KB
      options.maxSizeMB = 1;
    }

    try {
      const compressedBlob = await imageCompression(imageFile, options);

      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedBlob instanceof Blob
      // ); // true
      // console.log(
      //   `compressedFile size ${compressedBlob.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB

      // Create a new File object from the compressed Blob with missing properties
      const compressedFile = new File([compressedBlob], imageFile.name, {
        type: "image/jpeg",

        lastModified: Date.now(),
      });

      return compressedFile;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  const handlePosterImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setIsPosterUploading(true);
        const compressedFile = await handleCompressFile(file);

        if (compressedFile) {
          setSelectedPosterImage(URL.createObjectURL(compressedFile));
          setNewPosterImageFile(compressedFile);
          setIsPosterUploading(false);
        } else {
          setIsPosterUploading(false);
          console.log("Compression failed or was not needed.");
        }
      } catch (error) {
        setIsPosterUploading(false);
        console.log(error);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const handleSaveProduct = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);

    console.log("JewelleryCollection:", product.JewelleryCollection);
    formData.append("title", product.title);
    formData.append("description", product.description);

    formData.append("price", String(product.price));

    product.JewelleryCollection.forEach((itemId) => {
      formData.append("JewelleryCollection[]", itemId as string);
    });

    var removedImages: string[] = removedProductImages;

    newProductUplodedImages && newProductUplodedImages.length > 0;
    newProductUplodedImages.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    if (
      newPosterImageFile &&
      newPosterImageFile.size > 0 &&
      newPosterImageFile.name != ""
    ) {
      formData.append("posterImage", newPosterImageFile);

      if (product.posterURL) {
        removedImages = [...removedProductImages, product.posterURL];
      }
    }

    if (!isEdit) {
      productCreateMutation.mutate(formData, {
        onSuccess: () => {
          handleCloseDialog();
          updateSnackBarState(true, "Product added successfully.", "success");
        },
        onError: () => {
          updateSnackBarState(true, "Error while add Product.", "error");
        },
      });
    } else {
      formData.append("id", product._id!);
      formData.append("removedImages", JSON.stringify(removedImages));
      formData.append("existingImages", JSON.stringify(productUploadedImages));

      updateProductMutation.mutate(formData, {
        onSuccess: () => {
          handleCloseDialog();
          updateSnackBarState(true, "Product updated successfully.", "success");
        },
        onError: () => {
          updateSnackBarState(true, "Error while update Product.", "error");
        },
      });
    }
  };

  const handleDeleteUploadedImage = (index: number) => {
    const images = [...productUploadedImages];
    var removedImage = images.splice(index, 1);
    setRemovedProductImages([...removedProductImages, ...removedImage]);
    setProductuploadedImages(images);
    setUploadedImageHoverIndex(null);
  };

  const handleCheckboxChange = (clickedCategory: ICategory) => {
    setSelectedCategory((prevCategories) => {
      const updatedCategories = prevCategories.some(
        (cat) => cat._id === clickedCategory._id
      )
        ? prevCategories.filter((cat) => cat._id !== clickedCategory._id)
        : [...prevCategories, clickedCategory];

      const selectedCategoryIds = updatedCategories.map((cat) => cat._id);

      setProduct((prevProduct) => ({
        ...prevProduct,
        JewelleryCollection: selectedCategoryIds,
      }));

      return updatedCategories;
    });
  };

  return (
    <Dialog
      fullScreen
      open={ProductdialogOpen}
      onClose={handleCloseDialog}
      sx={{ height: "100%" }}
      TransitionComponent={Transition}
    >
      <form ref={formRef} onSubmit={handleSaveProduct}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" sx={{ paddingLeft: "10px" }}>
            {isEdit ? "Edit Product" : "Add Product"}
          </Typography>
          <Button
            color="inherit"
            onClick={handleCloseDialog}
            sx={{
              float: "right",
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>

        <Divider />
        <DialogContent>
          <Grid container columnSpacing={5}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Title
              </Typography>

              <TextField
                size="small"
                fullWidth
                value={product.title}
                onChange={(e) =>
                  setProduct((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
              />

              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Description
              </Typography>

              <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={6}
                value={product.description}
                onChange={(e) =>
                  setProduct((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Collections
              </Typography>
              <FormGroup>
                {collections.map((collection) => (
                  <FormControlLabel
                    key={collection._id}
                    control={
                      <Checkbox
                        checked={selectedCategory.some(
                          (cat) => cat._id === collection._id
                        )}
                        onChange={() => handleCheckboxChange(collection)}
                      />
                    }
                    label={collection.name}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={6} sx={{ paddingRight: "50px" }}>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Price
              </Typography>

              <TextField
                size="small"
                fullWidth
                value={product.price}
                onChange={(e) =>
                  setProduct((prevState) => ({
                    ...prevState,
                    price: parseFloat(e.target.value),
                  }))
                }
              />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",

                      marginTop: "15px",
                    }}
                  >
                    <Typography variant="h6">Images</Typography>

                    <Button
                      variant="outlined"
                      onClick={handlePosterButtonClick}
                    >
                      <AddIcon />
                      Upload Image
                    </Button>

                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={fileImageRef}
                      onChange={handleImagesUpload}
                      multiple
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {selectedPosterImage && (
                      <Box>
                        <img
                          src={selectedPosterImage}
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 2,
                      marginTop: 3,
                    }}
                  >
                    <Typography variant="h6">PosterURL</Typography>

                    <Button
                      variant="outlined"
                      onClick={handleImagesButtonClick}
                    >
                      <AddIcon />
                      Upload posterURL
                    </Button>

                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={filePosterRef}
                      onChange={handlePosterImageUpload}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {isImagesUploading && (
                      <Box textAlign={"center"}>
                        <CircularProgress size={30} />
                      </Box>
                    )}
                    {newProductUplodedImages.length > 0 && (
                      <Box>
                        {newProductUplodedImages.map((image, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            style={{
                              width: "100px",
                              height: "100px",
                              padding: "5px",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Box mr={4} mb={2}>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
}

export default ProductDialog;
