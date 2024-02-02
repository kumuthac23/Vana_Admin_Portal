import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Card,
  CardContent,
  Grid,
  Drawer,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  ICategory,
  IProduct,
  JewelleryItemDrawerProps,
} from "../interface/type";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  netWeight: yup.number().required("Net Weight is required"),
  posterURL: yup.string().required("Poster URL is required"),
  images: yup.array().of(yup.string()),
  collection: yup.object().required(),
});

const JewelleryItem: React.FC<JewelleryItemDrawerProps> = ({
  isDrawerOpen,
  handleDrawerClose,
  selectedJewelleryITem,
}) => {
  const [collections, setCollections] = useState<ICategory[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/JewelleryCollection/getJewelleryCollection")
      .then((response) => response.json())
      .then((data) => {
        const collectionNames = data.map((collection: ICategory) => ({
          name: collection.name,
        }));
        setCollections(collectionNames);
      })
      .catch((error) => console.error("Error fetching collections:", error));
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = (data: IProduct) => {
    console.log(data);
  };

  return (
    <Drawer
      variant="temporary"
      open={isDrawerOpen}
      ModalProps={{
        keepMounted: true,
      }}
      anchor="right"
      sx={{
        position: "relative",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "100vw",
          height: "100vh",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <Typography variant="h4" sx={{ paddingLeft: "10px" }}>
          Add Product
        </Typography>
        <IconButton
          sx={{
            marginLeft: "auto",
            color: "black",
            "& .MuiSvgIcon-root": {
              fontWeight: "bold",
            },
          }}
          onClick={handleDrawerClose}
        >
          <Close sx={{ fontWeight: "bold" }} />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ paddingTop: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6} style={{ paddingLeft: "80px" }}>
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
                    helperText={errors.title?.message}
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
                      component="label"
                      startIcon={<AddIcon />}
                      sx={{
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Upload Image
                      <input type="file" style={{ display: "none" }} />
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "15px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">Postal URL</Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<AddIcon />}
                      sx={{
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Upload Poster Images
                      <input type="file" style={{ display: "none" }} multiple />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              bottom: 20,
              right: 20,
              marginRight: 3,
              position: "fixed",
              columnGap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleDrawerClose}
              sx={{ fontWeight: "bold", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default JewelleryItem;
