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
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import { getUserToken } from "../services/AuthService";
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function LoginCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [facebookLoginClick, setFacebookLoginClick] = useState(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [requestedAuth, setRequestedAuth] = useState(false);

  const handleChange = (event) => {
    props.getValidationForm({
      ...props.currentForm,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.hasSubmited(true);
  };

  useEffect(() => {
    localStorage.removeItem("userCredentials");
  }, []);

  useEffect(() => {
    if (!loading && user) {
      getUserToken(user.email, user.email, dispatch, router);
    }
  }, [loading]);

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
              Entrar
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
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar"
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
                  ENTRAR
                </Button>
                <SocialMediaAuth callBackLink={"/Login"} />
                <Button
                  onClick={() =>
                    signInWithGoogle()
                      .then((user) => {
                        console.log(user);
                      })
                      .catch((e) => console.log(e.message))
                  }
                />
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
