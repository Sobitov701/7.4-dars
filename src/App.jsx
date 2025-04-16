import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <CssBaseline />

      <AppBar position="static" sx={{ backgroundColor: "black " }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Uzum Inspired Shop
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="bg">
        <Container sx={{ py: 6 }}>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="custom-card">
                    <Box className="image-container">
                      <CardMedia
                        component="img"
                        image={product.thumbnail}
                        alt={product.title}
                        className="card-img"
                      />
                    </Box>
                    <CardContent className="card-content">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: "black" }}
                        onClick={() => handleOpenModal(product)}
                      >
                        Batafsil
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <Dialog
            open={true}
            onClose={handleCloseModal}
            fullWidth
            maxWidth="sm"
            PaperComponent={motion.div}
            PaperProps={{
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              transition: { duration: 0.3 },
            }}
          >
            <DialogTitle
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {selectedProduct.title}
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className="modal" dividers>
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              />
              <Typography variant="h6" gutterBottom>
                ${selectedProduct.price}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedProduct.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {selectedProduct.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {selectedProduct.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {selectedProduct.stock}
              </Typography>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <footer
        style={{
          backgroundColor: "black",
          padding: "1rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="body2">
          © 2025 Uzum Inspired Shop. All rights reserved.
        </Typography>
      </footer>
    </>
  );
}

export default App;
