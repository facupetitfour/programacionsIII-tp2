import { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const serverhost = "http://localhost:3000/";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "products", {
          withCredentials: true,
        });
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        navigate("/login");
      }
    };
    getData();
  }, [navigate]);

  return (
    <>
      <NavBar />
      {data ? (
        <Container sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {data.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image={product.img}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : null}
    </>
  );
}

export default Home;
