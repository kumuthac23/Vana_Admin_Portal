// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   TextField,
// //   Button,
// //   Box,
// //   IconButton,
// //   Typography,
// //   Divider,
// //   FormControlLabel,
// //   Checkbox,
// //   FormGroup,
// //   Card,
// //   CardContent,
// //   Grid,
// //   Drawer,
// // } from "@mui/material";
// // import { Close } from "@mui/icons-material";
// // import AddIcon from "@mui/icons-material/Add";
// // import * as yup from "yup";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import { Controller, useForm } from "react-hook-form";
// // import {
// //   ICategory,
// //   IProduct,
// //   JewelleryItemDrawerProps,
// // } from "../interface/type";
// // import imageCompression from "browser-image-compression";
// // import CircularProgress from "@mui/material/CircularProgress";
// // import toast from "react-hot-toast";
// // import { useCreateProductMutation, useUpdateProductMutation } from "../customHooksRQ/Product";
// // import { createProduct } from "../services/Product";

// // const schema = yup.object().shape({
// //   title: yup.string().required("Title is required"),
// //   price: yup.number().required("Price is required"),
// //   description: yup.string().required("Description is required"),
// //   netWeight: yup.number().required("Net Weight is required"),
// //   posterURL: yup.string().required("Poster URL is required"),
// //   images: yup.array().of(yup.string()),
// //   collection: yup.object().required(),
// // });

// // const JewelleryItem: React.FC<JewelleryItemDrawerProps> = ({
// //   isDrawerOpen,
// //   handleDrawerClose,
// //   selectedJewelleryITem,
// // }) => {
// //   // const formRef = useRef(null);
// //   var productCreateMutation = useCreateProductMutation();
// //   var productUpdateMutation = useUpdateProductMutation();
// //   const [collections, setCollections] = useState<ICategory[]>([]);

// //   const [isPosterUploading, setIsPosterUploading] = useState(false);
// //   const [selectedPosterImage, setSelectedPosterImage] = useState<string | null>(
// //     null
// //   );
// //   const [newPosterImageFile, setNewPosterImageFile] = useState<File | null>(
// //     null
// //   );
// //   const [isImagesUploading, setIsImagesUploading] = useState(false);
// //   const [newProductUplodedImages, setNewProductUploadImages] = useState<File[]>(
// //     []
// //   );
// //   const filePosterRef = useRef<HTMLInputElement>(null);
// //   const fileImageRef = useRef<HTMLInputElement>(null);

// //   useEffect(() => {
// //     fetch("http://localhost:3000/JewelleryCollection/getJewelleryCollection")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         const collectionNames = data.map((collection: ICategory) => ({
// //           name: collection.name,
// //         }));
// //         setCollections(collectionNames);
// //       })
// //       .catch((error) => console.error("Error fetching collections:", error));
// //   }, []);


// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //        reset,
// //   } = useForm<IProduct>({
// //     resolver: yupResolver(schema) as any,
// //   });
// //   async function handleCompressFile(event: File): Promise<File | undefined> {
// //     const imageFile = event;

// //     let options = {
// //       maxSizeMB: 1,
// //       maxWidthOrHeight: 1920,
// //       useWebWorker: true,
// //     };

// //     // Check if the image size is above 1 MB
// //     if (imageFile.size > 1024 * 1024) {
// //       // Reduce the maxSizeMB to compress the image to approximately 500 KB
// //       options.maxSizeMB = 1;
// //     }

// //     try {
// //       const compressedBlob = await imageCompression(imageFile, options);

// //       // console.log(
// //       //   "compressedFile instanceof Blob",
// //       //   compressedBlob instanceof Blob
// //       // ); // true
// //       // console.log(
// //       //   `compressedFile size ${compressedBlob.size / 1024 / 1024} MB`
// //       // ); // smaller than maxSizeMB

// //       // Create a new File object from the compressed Blob with missing properties
// //       const compressedFile = new File([compressedBlob], imageFile.name, {
// //         type: "image/jpeg",
// //         lastModified: Date.now(),
// //       });

// //       return compressedFile;
// //     } catch (error) {
// //       console.log(error);
// //       return undefined;
// //     }
// //   }
// //   const resetForm = () => {
    
// //     reset();

 
// //     setCollections([]);
// //     setIsPosterUploading(false);
// //     setSelectedPosterImage(null);
// //     setNewPosterImageFile(null);
// //     setIsImagesUploading(false);
// //     setNewProductUploadImages([]);
// //   };
// //   const handlePosterImageUpload = async (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     const file = event.target.files?.[0];

// //     if (file) {
// //       try {
// //         setIsPosterUploading(true);
// //         const compressedFile = await handleCompressFile(file);

// //         if (compressedFile) {
// //           setSelectedPosterImage(URL.createObjectURL(compressedFile));
// //           setNewPosterImageFile(compressedFile);
// //           setIsPosterUploading(false);
// //         } else {
// //           setIsPosterUploading(false);
// //           console.log("Compression failed or was not needed.");
// //         }
// //       } catch (error) {
// //         setIsPosterUploading(false);
// //         console.log(error);
// //       }
// //     } else {
// //       console.log("No file selected.");
// //     }
// //   };
// //   const handlePosterButtonClick = () => {
// //     if (filePosterRef.current) {
// //       filePosterRef.current?.click();
// //     }
// //   };
// //   const handleImagesButtonClick = () => {
// //     if (fileImageRef.current) {
// //       fileImageRef.current.click();
// //     }
// //   };
// //   const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;

// //     if (files) {
// //       setIsImagesUploading(true);
// //       const filesArray: File[] = Array.from(files);
// //       const validFiles = filesArray.filter(
// //         (file) =>
// //           file.type === "image/png" ||
// //           file.type === "image/jpeg" ||
// //           file.type === "image/jpg"
// //       );

// //       const compressedFiles = await Promise.all(
// //         validFiles.map((file) => handleCompressFile(file))
// //       );

// //       const compressedValidFiles = compressedFiles.filter(
// //         (compressedFile) => compressedFile !== undefined
// //       ) as File[]; // Filter out undefined and cast as File[]

// //       setNewProductUploadImages([
// //         ...newProductUplodedImages,
// //         ...compressedValidFiles,
// //       ]);

// //       setIsImagesUploading(false);
// //     } else {
// //       console.log(
// //         "Invalid file format. Please select a JPEG or PNG or JPG file."
// //       );
// //     }
// //   };
// //  const handleSaveProduct = async (data: IProduct) => {
// //    const formData = new FormData();
// //    formData.append("title", data.title);
// //    formData.append("description", data.description);
// //    formData.append("price", data.price.toString());
// //    formData.append("netWeight", data.netWeight.toString());

// // const selectedCollections = collections.filter((collection) =>
// //   data.JewelleryCollection.some((item) => item.name === collection.name)
// // );

// // formData.append(
// //   "collection",
// //   JSON.stringify(selectedCollections.map((collection) => collection.name))
// // );


// // if (newPosterImageFile) {
// //   formData.append("posterImage", newPosterImageFile);
// // }


// // newProductUplodedImages.forEach((image, index) => {
// //   formData.append(`image_${index}`, image);
// // });
// //    if (!selectedJewelleryITem) {
// //       console.log("hi")
// //     console.log("h")
// //     productCreateMutation.mutate(formData, {
// //       onSuccess: () => {
// //         handleDrawerClose();
// //         resetForm();
// //       },
// //       onError: (error: any) => {
// //         toast.error(error.response.data.message);
// //       },
// //     });
// //   } else {
  
// //     // formData.append("_id", selectedJewelleryITem._id);
// //     productUpdateMutation.mutate(formData, {
// //       onSuccess: () => {
// //         handleDrawerClose();
// //         resetForm();
// //       },
// //       onError: (error: any) => {
// //         toast.error(error.response.data.message);
// //       },
// //     });
// //   }
// //    };
  



// //   return (
// //     <Drawer
// //       variant="temporary"
// //       open={isDrawerOpen}
// //       ModalProps={{
// //         keepMounted: true,
// //       }}
// //       anchor="right"
// //       sx={{
// //         position: "relative",
// //         "& .MuiDrawer-paper": {
// //           boxSizing: "border-box",
// //           width: "100vw",
// //           height: "100vh",
// //         },
// //       }}
// //     >
// //       <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
// //         <Typography variant="h4" sx={{ paddingLeft: "10px" }}>
// //           Add Product
// //         </Typography>
// //         <IconButton
// //           sx={{
// //             marginLeft: "auto",
// //             color: "black",
// //             "& .MuiSvgIcon-root": {
// //               fontWeight: "bold",
// //             },
// //           }}
// //           onClick={handleDrawerClose}
// //         >
// //           <Close sx={{ fontWeight: "bold" }} />
// //         </IconButton>
// //       </Box>
// //       <Divider />

// //       <Box sx={{ paddingTop: 1 }}>
// //         <form onSubmit={handleSubmit(handleSaveProduct)}>
// //           <Grid container spacing={5}>
// //             <Grid item xs={6} style={{ paddingLeft: "80px" }}>
// //               <Typography variant="h6" sx={{ marginTop: 1 }}>
// //                 Title
// //               </Typography>
// //               <Controller
// //                 name="title"
// //                 control={control}
// //                 render={({ field }) => (
// //                   <TextField
// //                     {...field}
// //                     fullWidth
// //                     size="small"
// //                     margin="normal"
// //                     sx={{ marginTop: 0 }}
// //                     error={!!errors.title}
// //                     helperText={errors.title?.message}
// //                   />
// //                 )}
// //               />
// //               <Typography variant="h6" sx={{ marginTop: 1 }}>
// //                 Description
// //               </Typography>
// //               <Controller
// //                 name="description"
// //                 control={control}
// //                 render={({ field }) => (
// //                   <TextField
// //                     {...field}
// //                     fullWidth
// //                     size="small"
// //                     margin="normal"
// //                     sx={{ marginTop: 0 }}
// //                     error={!!errors.description}
// //                     helperText={errors.description?.message}
// //                     multiline
// //                     rows={4}
// //                   />
// //                 )}
// //               />
// //               <Typography variant="h6" sx={{ marginTop: 1 }}>
// //                 Collections
// //               </Typography>
// //               <FormGroup>
// //                 {collections.map((collection, index) => (
// //                   <Card
// //                     key={index}
// //                     sx={{ marginBottom: 1, height: "65px", minHeight: 0 }}
// //                   >
// //                     <CardContent>
// //                       <FormControlLabel
// //                         control={
// //                           <Controller
// //                             name={
// //                               `collection.${collection.name}` as keyof IProduct
// //                             }
// //                             control={control}
// //                             render={({ field }) => <Checkbox {...field} />}
// //                           />
// //                         }
// //                         label={collection.name}
// //                       />
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </FormGroup>
// //             </Grid>
// //             <Grid item xs={6} sx={{ paddingRight: "50px" }}>
// //               <Typography variant="h6" sx={{ marginTop: 1 }}>
// //                 Price
// //               </Typography>
// //               <Controller
// //                 name="price"
// //                 control={control}
// //                 render={({ field }) => (
// //                   <TextField
// //                     {...field}
// //                     type="tel"
// //                     fullWidth
// //                     size="small"
// //                     margin="normal"
// //                     sx={{ marginTop: 0 }}
// //                     error={!!errors.price}
// //                     helperText={errors.price?.message}
// //                   />
// //                 )}
// //               />
// //               <Typography variant="h6" sx={{ marginTop: 1 }}>
// //                 Net Weight
// //               </Typography>
// //               <Controller
// //                 name="netWeight"
// //                 control={control}
// //                 render={({ field }) => (
// //                   <TextField
// //                     {...field}
// //                     type="tel"
// //                     fullWidth
// //                     size="small"
// //                     margin="normal"
// //                     sx={{ marginTop: 0 }}
// //                     error={!!errors.netWeight}
// //                     helperText={errors.netWeight?.message}
// //                   />
// //                 )}
// //               />

// //               <Grid container spacing={2}>
// //                 <Grid item xs={12}>
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "space-between",
// //                       marginTop: "15px",
// //                     }}
// //                   >
// //                     <Typography variant="h6">Images</Typography>
// //                     <Button
// //                       variant="outlined"
// //                       onClick={handleImagesButtonClick}
// //                     >
// //                       <AddIcon />
// //                       Upload Images
// //                     </Button>

// //                     <input
// //                       type="file"
// //                       style={{ display: "none" }}
// //                       ref={fileImageRef}
// //                       onChange={handleImagesUpload}
// //                       multiple
// //                     />
// //                   </Box>
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       flexWrap: "wrap",
// //                       gap: 2,
// //                     }}
// //                   >
// //                     {isImagesUploading && (
// //                       <Box textAlign={"center"}>
// //                         <CircularProgress size={30} />
// //                       </Box>
// //                     )}
// //                     {newProductUplodedImages.length > 0 && (
// //                       <Box>
// //                         {newProductUplodedImages.map((image, index) => (
// //                           <img
// //                             key={index}
// //                             src={URL.createObjectURL(image)}
// //                             style={{
// //                               width: "100px",
// //                               height: "100px",
// //                               padding: "5px",
// //                             }}
// //                           />
// //                         ))}
// //                       </Box>
// //                     )}
// //                   </Box>
// //                 </Grid>

// //                 <Grid item xs={12}>
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "space-between",
// //                       marginBottom: 2,
// //                       marginTop: 3,
// //                     }}
// //                   >
// //                     <Typography variant="h6">PosterURL</Typography>

// //                     <Button
// //                       variant="outlined"
// //                       onClick={handlePosterButtonClick}
// //                     >
// //                       <AddIcon />
// //                       Upload Poster
// //                     </Button>
// //                   </Box>
// //                   <input
// //                     type="file"
// //                     style={{ display: "none" }}
// //                     ref={filePosterRef}
// //                     onChange={handlePosterImageUpload}
// //                   />
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       gap: 2,
// //                     }}
// //                   >
// //                     {selectedPosterImage && (
// //                       <Box>
// //                         <img
// //                           src={selectedPosterImage}
// //                           style={{
// //                             width: "100px",
// //                             height: "100px",
// //                           }}
// //                         />
// //                       </Box>
// //                     )}
// //                   </Box>
// //                 </Grid>
// //               </Grid>
// //             </Grid>
// //           </Grid>

// //           <Box
// //             sx={{
// //               display: "flex",
// //               bottom: 20,
// //               right: 20,
// //               marginRight: 3,
// //               position: "fixed",
// //               columnGap: 2,
// //             }}
// //           >
// //             <Button
// //               variant="outlined"
// //               onClick={handleDrawerClose}
// //               sx={{ fontWeight: "bold", textTransform: "none" }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               variant="contained"
// //               type="submit"
// //               sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}
// //             >
// //               Save
// //             </Button>
// //           </Box>
// //         </form>
// //       </Box>
// //     </Drawer>
// //   );
// // };

// // export default JewelleryItem;



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
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Select,
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


import { useCreateProductMutation, useUpdateProductMutation } from "../customHooksRQ/Product";
// import { useGetAllCategory } from "../customHooksRQ/Category";
import { ICategory, IProduct } from "../interface/type";
import { useSnackBar } from "../context/SnackBarContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllCategory } from "../services/CategoryApi";


interface IProps {
  selectedProduct: IProduct;
  dialogOpen: boolean;
  onCloseDialog(): void;
  onProductEdit: (updatedProduct: IProduct) => void;
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

  const [selectedCategory, setSelectedCategory] = useState("");
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
    setIsEdit(true);
    setProduct({ ...selectedProduct });

    // Set title, price, description, and netWeight fields
    reset({
      title: selectedProduct.title,
      price: selectedProduct.price,
      description: selectedProduct.description,
      netWeight: selectedProduct.netWeight,
      // Add default values for image, posterURL, and collection
      images: selectedProduct.images || [],
      posterURL: selectedProduct.posterURL || "",
      collection: selectedProduct.JewelleryCollection?.[0]?.id || "",
    });

    // Set selected category
    setSelectedCategory(selectedProduct.JewelleryCollection?.[0]?.id || "");
  }
}, [selectedProduct, reset]);




useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getAllCategory();
    const collectionNames: ICategory[] = data.map((collection: ICategory) => ({
      name: collection.name,
      description: "",
      images: [],
      image: "", 
    }));
     setCollections(collectionNames);

    } catch (error) {
      console.error("Error fetching collections:", error);
      // Handle error gracefully, e.g., show error message to user
      updateSnackBarState(true, "Error fetching collections.", "error");
    }
  };

  fetchData(); // Call the async function
}, []);


  const resetForm = () => {
    setProduct({ ...ProductInitialValue });
    setIsEdit(false);

    setSelectedPosterImage("");
    setNewProductUploadImages([]);
    setSelectedCategory("");
    setProductuploadedImages([]);
    setNewPosterImageFile(null);
    setRemovedProductImages([]);
    // setPurchaseDate(null);
    // setIsWithGST(false);
    // setSellerName("");
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
      ) as File[]; // Filter out undefined and cast as File[]

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

    var removedImages: string[] = removedProductImages;

    newProductUplodedImages && newProductUplodedImages.length > 0;
    newProductUplodedImages.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    // sizeList && sizeList.length > 0;
    // sizeList.forEach((item, index) => {
    //   formData.append(`sizes[${index}]`, JSON.stringify(item));

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
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    margin="normal"
                    sx={{ marginTop: 0 }}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                  />
                )}
              />

              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Description
              </Typography>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    margin="normal"
                    sx={{ marginTop: 0 }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    multiline
                    rows={4}
                  />
                )}
              />
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Collections
              </Typography>
              <FormGroup>
                {collections.map((collection, index) => (
                  <Card
                    key={index}
                    sx={{ marginBottom: 1, height: "65px", minHeight: 0 }}
                  >
                    <CardContent>
                      <FormControlLabel
                        control={
                          <Controller
                            name={
                              `collection.${collection.name}` as keyof IProduct
                            }
                            control={control}
                            render={({ field }) => <Checkbox {...field} />}
                          />
                        }
                        label={collection.name}
                      />
                    </CardContent>
                  </Card>
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={6} sx={{ paddingRight: "50px" }}>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Price
              </Typography>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="tel"
                    fullWidth
                    size="small"
                    margin="normal"
                    sx={{ marginTop: 0 }}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Net Weight
              </Typography>
              <Controller
                name="netWeight"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="tel"
                    fullWidth
                    size="small"
                    margin="normal"
                    sx={{ marginTop: 0 }}
                    error={!!errors.netWeight}
                    helperText={errors.netWeight?.message}
                  />
                )}
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
                      Upload poster
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
                      Upload Image
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

