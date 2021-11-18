import { React, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { createTheme } from "@material-ui/core/styles";
import loginStyles from "../styles/Login.module.css";
import { SocialMediaAuth } from "./SocialMediaAuth";
import { useRouter } from "next/router";

const theme = createTheme();

export default function SignUpCard(props) {
  const router = useRouter();
  const [facebookLoginClick, setFacebookLoginClick] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    sessionStorage.setItem("auth", true);
    router.push("/PropertySearch");
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleChange = (event) => {
    props.setUserRole(event.target.id);
  };

  return (
    // <ThemeProvider theme={theme}>
    <Grid container justifyContent="center" component="main">
      <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={loginStyles.loginPaperCard}
        >
          <Box
            style={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar style={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar-se
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de e-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.userRole == 2}
                    id="2"
                    onChange={handleChange}
                  />
                }
                label="Aprovador"
              />{" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.userRole == 3}
                    id="3"
                    onChange={handleChange}
                  />
                }
                label="Cadastrador"
              />
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: "205px" }}
                >
                  Cadastrar-se
                </Button>
                <SocialMediaAuth />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        xs={false}
        sm={5}
        md={8}
        style={{
          backgroundImage:
            "url(https://images.adsttc.com/media/images/5e1d/02c3/3312/fd58/9c00/06e9/large_jpg/NewHouse_SA_Photo_01.jpg?1578959519)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
    // </ThemeProvider>
  );
}
