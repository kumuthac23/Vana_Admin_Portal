import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Button,
  Typography,
  TextField,
  Input,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CategoryDrawerProps, ICategory } from "../interface/type";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../customHooksRQ/Category";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter the name"),
  description: Yup.string().required("Please enter the description"),
  image: Yup.mixed(),
});

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isDrawerOpen,
  handleDrawerClose,
  selectedCategory,
}) => {
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setValue("name", selectedCategory?.name || "");
    setValue("description", selectedCategory?.description || "");
    setValue("image", selectedCategory?.image || "");
  }, [selectedCategory]);

  const onSubmit: SubmitHandler<ICategory> = async (categoryFormData) => {
    const formData = new FormData();
    formData.append("name", categoryFormData.name);
    formData.append("description", categoryFormData.description);

    formData.append("image", image as File);

    if (selectedCategory) {
      if (selectedCategory._id) {
        await updateCategoryMutation.mutateAsync(
          {
            ...categoryFormData,
            _id: selectedCategory._id,
          },
          {
            onError: (error) => console.log(error.message),
          }
        );
      } else {
        await createCategoryMutation.mutateAsync(categoryFormData, {
          onError: (error) => console.log(error.message),
        });
      }
    }

    handleDrawerClose();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setImage(file);
      const filereader = new FileReader();
      filereader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
        }
      };
      filereader.readAsDataURL(file);
      console.log(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
      <Box p={2} width={"400px"} role="presentation">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" padding={1}>
            {selectedCategory?._id ? "Edit Category" : "Add Category"}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" rowGap={2}>
            <TextField
              fullWidth
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />

            <TextField
              fullWidth
              // multiline
              // rows={4} // Set the number of visible rows
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />

            <Box
              marginTop={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Category image</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="file"
                  inputRef={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  inputProps={{ accept: "image/*" }}
                />
                <Button
                  variant="outlined"
                  type="button"
                  sx={{ textTransform: "none" }}
                  onClick={handleButtonClick}
                >
                  + Upload file
                </Button>
              </Box>
            </Box>

            {imagePreview ? (
              <Box>
                {imagePreview != null && (
                  <img src={imagePreview} width={"50px"} />
                )}
              </Box>
            ) : (
              <Box>
                {selectedCategory?.image != null && (
                  <img
                    src={`http://localhost:3000/category/images/${selectedCategory?.image}`}
                    alt="image"
                    width={"50px"}
                  />
                )}
              </Box>
            )}

            <Box
              position={"absolute"}
              bottom={7}
              right={10}
              display={"flex"}
              columnGap={2}
            >
              <Button
                variant="contained"
                type="submit"
                autoFocus
                sx={{ textTransform: "none" }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleDrawerClose}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default CategoryDrawer;
