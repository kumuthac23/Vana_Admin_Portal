import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Drawer,
  IconButton,
  Button,
  Typography,
  TextField,
  Tooltip,
  Input,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { CategoryDrawerProps, ICategory } from "../interface/type";


const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  descrption: yup.string().required("Email is required"),
});

const CategoryDrawerNew: React.FC<CategoryDrawerProps> = ({
  isDrawerOpen,
  handleDrawerClose,
  selectedCategory,
}) => {
 
  const { handleSubmit, setValue } = useForm<ICategory>({
    resolver: yupResolver(schema) as any,
    defaultValues: { ...selectedCategory },
  });
  const [viewCategory, setViewCategory] = useState<ICategory>({
    ...selectedCategory!,
  });
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedCategory && selectedCategory.image) {
      setImagePreview(
        `http://localhost:3000/category/images/${selectedCategory.image}`
      );
      setValue("image", selectedCategory.image);
    }
  }, [selectedCategory, setValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setViewCategory((prev: ICategory) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
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

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", viewCategory.name.toString());
    formData.append("description", viewCategory.description.toString());

    formData.append("image", image as File);
    if (selectedCategory) {
      if (selectedCategory._id) {
        axios
          .put<ICategory[]>(
            `http://localhost:3000/category/updateCategory/${selectedCategory._id}`,
            formData
          )
          .then(() => {
            handleDrawerClose();
          })
          .catch((error) => {
            console.error("Error while creating the Category:", error);
          });
      } else {
        axios
          .post<ICategory[]>(
            "http://localhost:3000/category/createCategory",
            formData
          )
          .then(() => {
            handleDrawerClose();
          })
          .catch((error) => {
            console.error("Error while creating the Category:", error);
          });
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => {
        handleDrawerClose();
      }}
    >
      {selectedCategory && (
        <Box p={2} width={"400px"} role="presentation">
          <Box>
            <Tooltip title="cancel">
              <IconButton
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                }}
                onClick={() => {
                  handleDrawerClose();
                }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="h5" padding={1}>
            {selectedCategory._id ? "Edit Category" : "Add Category "}
          </Typography>
          <form onSubmit={handleSubmit(handleSave)}>
            <Box>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                name="name"
                size="small"
                sx={{ padding: "10px" }}
                value={viewCategory.name}
                onChange={handleTextChange}
              />
              <TextField
                label="Name"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                name="description"
                size="small"
                sx={{ padding: "10px" }}
                value={viewCategory.description}
                onChange={handleTextChange}
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
                  <InputLabel
                    htmlFor="file-input"
                    sx={{ display: "flex", cursor: "pointer" }}
                  >
                    <Input
                      type="file"
                      id="file-input"
                      inputRef={fileInputRef}
                      onChange={handleFileUpload}
                      sx={{ display: "none" }}
                    />
                    <Button
                      variant="outlined"
                      type="button"
                      sx={{ textTransform: "none" }}
                      onClick={handleButtonClick}
                    >
                      + Upload file
                    </Button>
                  </InputLabel>
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
              <Box>
                <Box
                  position={"absolute"}
                  bottom={7}
                  right={10}
                  display={"flex"}
                  columnGap={2}
                >
                  <Button
                    variant="contained"
                    autoFocus
                    sx={{ textTransform: "none" }}
                    onClick={handleSave}
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
            </Box>
          </form>
        </Box>
      )}
    </Drawer>
  );
};

export default CategoryDrawerNew;
