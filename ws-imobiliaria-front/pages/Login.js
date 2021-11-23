import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LoginCard from "../components/LoginCard";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import { searchUser } from "../services/UserService";
import { getUserToken } from "../services/AuthService";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [result, setResult] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const getResult = (value) => setResult(value);
  const [user, loading, error] = useAuthState(firebase.auth())

  useEffect(() => {
    console.log(result)
  }, [result])

  useEffect(() => {
    if (!userExists && hasSubmitted) {
      getUserToken(result.email, result.password, dispatch, router)
        .then((result) => {
          setHasSubmitted(result)
          setUserExists(result)
        })
    }
  }, [hasSubmitted])

  return (
    <>
      <Grid container>
        <LoginCard
          getValidationForm={getResult}
          currentForm={result}
          hasSubmited={setHasSubmitted}
        />
      </Grid>
    </>
  );
};
export default Login;

