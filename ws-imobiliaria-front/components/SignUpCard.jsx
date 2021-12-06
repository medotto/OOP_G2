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
import { searchUser } from "../services/UserService";
import { createUser } from "../services/UserService";
const theme = createTheme();

export default function SignUpCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    userRole: { id: "3" },
  });
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    localStorage.removeItem("userCredentials");
  }, []);

  useEffect(() => {
    if (user) {
      getUserToken(user.email, user.email, dispatch, router).then((resp) => {
        if (resp.error) {
          createUser({
            nome: user.displayName,
            email: user.email,
            password: user.email,
            roleList: [values.userRole],
          }).then((resp) => {
            if (!resp.error) {
              getUserToken(user.email, user.email, dispatch, router);
            }
          });
        }
      });
    }
  }, [user]);

  const handleSubmit = (event) => {
    createUser(values).then((resp) => {
      if (!resp.error) {
        getUserToken(values.email, values.password, dispatch, router);
      }
    });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if (event.target.name.includes("checkbox"))
      setValues({ ...values, userRole: { id: event.target.id } });
  };

  return (
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
            <Box component="form" noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                onChange={handleChange}
                value={values.nome}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={handleChange}
                label="Endereço de e-mail"
                value={values.email}
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                onChange={handleChange}
                type="password"
                id="password"
                value={values.password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.userRole?.id == 2}
                    name="checkbox-admin"
                    id="2"
                    onChange={handleChange}
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.userRole?.id == 3}
                    name="checkbox-cadastrador"
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
                  variant="contained"
                  onClick={(event) => handleSubmit(event)}
                  color="primary"
                  style={{ width: "205px" }}
                >
                  Cadastrar-se
                </Button>
                <SocialMediaAuth callBackLink={"/SignUp"} />
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
  );
}
