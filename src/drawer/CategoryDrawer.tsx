import Drawer from "@mui/material/Drawer";
import { Box, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import imageCompression from "browser-image-compression";
import { CategoryDrawerProps, ICategory } from "../interface/type";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../customHooksRQ/Category";
import { newCategory } from "../pages/Category";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Name should be min 5 characters")
    .required("Please enter the name"),
  description: yup.string(),
  // image: yup.mixed().required("Menu image is required"),
});

function CategoryDrawer(props: CategoryDrawerProps) {
  const {
    isDrawerOpen: categoryDrawerOpen,
    handleDrawerClose,
    selectedCategory,

  } = props;
  const formRef = useRef(null);

  var categoryCreateMutation = useCreateCategoryMutation();
  var categoryUpdateMutation = useUpdateCategoryMutation();

  const [category, setCategory] = useState<ICategory>(newCategory);
  const [selectedCategoryImage, setSelectedCategoryImage] = useState<
    string | null
  >(null);
  const [newCategoryImageFile, setNewCategoryImageFile] = useState<File | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    resolver: yupResolver(schema) as any,
    mode: "all",
    defaultValues: {
      name: selectedCategory?.name || "",
      description: selectedCategory?.description || "",
    },
  });

  const filePosterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      setCategory({ ...selectedCategory });
      setSelectedCategoryImage(selectedCategory.image ?? null);
    }
  }, [selectedCategory]);

  const handleUploadButtonClick = () => {
    if (filePosterRef.current) {
      filePosterRef.current?.click();
    }
  };

  async function handleCompressFile(event: File): Promise<File | undefined> {
    const imageFile = event;
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    // Check if the image size is above 1 MB
    if (imageFile.size > 1024 * 1024) {
      // Reduce the maxSizeMB to compress the image to approximately 500 KB
      options.maxSizeMB = 0.5;
    }

    try {
      const compressedBlob = await imageCompression(imageFile, options);
      console.log(
        `compressedFile size ${compressedBlob.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

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

  const handleCategoryImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await handleCompressFile(file);
        if (compressedFile) {
          setSelectedCategoryImage(URL.createObjectURL(compressedFile));
          setNewCategoryImageFile(compressedFile);
        } else {
          console.log("Compression failed or was not needed.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const handleSaveCategory = async (data: ICategory) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (
      newCategoryImageFile &&
      newCategoryImageFile.size > 0 &&
      newCategoryImageFile.name !== ""
    ) {
      // Append the image file
      formData.append("image", newCategoryImageFile);
      formData.append("categoryRemoveImage", category.image!);
    }

    if (!selectedCategory?._id) {
      categoryCreateMutation.mutate (formData, {
        onSuccess: () => {
          handleDrawerClose();
          resetForm();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    } else {
      formData.append("_id", selectedCategory?._id); 
      categoryUpdateMutation.mutate(formData, {
        onSuccess: () => {
          handleDrawerClose();
          resetForm();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    }
  };


  const resetForm = () => {
    setCategory({ ...newCategory });
    setSelectedCategoryImage(null);
    setNewCategoryImageFile(null);
    reset({ ...newCategory });
  };

  const drawer = (
    <Box sx={{ width: "350px" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          p={2}
        >
          <Typography variant="h6" component="div">
            {selectedCategory?._id ? "Edit Category" : "Add Category"}
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              resetForm();
              handleDrawerClose();
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} p={2}>
          <Box py={1}>
            <Typography variant="subtitle1">Name</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message?.toString()}
              inputProps={{
                style: {
                  padding: "10px",
                },
              }}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
              fullWidth
              autoComplete="new"
              required
            ></TextField>
          </Box>
          <Box py={1}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              id="outlined-multiline-flexible"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              {...register("description")}
              autoComplete="new"
              required
              error={!!errors.description}
              helperText={errors.description?.message?.toString()}
              inputProps={{
                style: {
                  minHeight: "10px", // Adjust the minimum height of the textarea
                },
              }}
              FormHelperTextProps={{
                sx: { color: "red", marginLeft: "0px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Collection Image
            </Typography>
            <Button
              variant="outlined"
              onClick={handleUploadButtonClick}
              sx={{ textTransform: "none" }}
              size="small"
            >
              <AddIcon />
              Upload Image
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <input
              type="file"
              style={{ display: "none" }}
              ref={filePosterRef}
              name="image"
              onChange={handleCategoryImageUpload}
            />

            {selectedCategoryImage ? (
              <img
                src={
                  `http://localhost:3000/category/images/${selectedCategoryImage} ` ||
                  selectedCategoryImage
                } 
                style={{
                  width: "100px",
                  height: "100px",
                }}
                alt="Selected Category Image"
              />
            ) : newCategoryImageFile ? (
              <img
                src={URL.createObjectURL(newCategoryImageFile)} // Using URL.createObjectURL for newly uploaded image
                style={{
                  width: "100px",
                  height: "100px",
                }}
                alt="Uploaded Image"
              />
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={categoryDrawerOpen}
      ModalProps={{
        keepMounted: true,
      }}
      anchor="right"
      sx={{
        position: "relative",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "350px",
        },
      }}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleSaveCategory)}>
        {drawer}
        <Box
          p={2}
          gap={2}
          display={"flex"}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              paddingRight: "30px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleDrawerClose();
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ color: "white" }}>
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}

export default CategoryDrawer;
