import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LoginCard from "../components/LoginCard";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";

const Login = () => {
  const router = useRouter();
  const [result, setResult] = useState(false);
  const getResult = (value) => setResult(value);
  const [user, loading, error] = useAuthState(firebase.auth())

  return (
    <>
      <Grid container>
        <LoginCard validationFunction={getResult} />
      </Grid>
    </>
  );
};
export default Login;

