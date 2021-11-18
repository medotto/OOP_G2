import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LoginCard from "../components/LoginCard";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import DoRequest from "../services/ReqService";

const Login = () => {
  const router = useRouter();
  const [result, setResult] = useState(false);
  const getResult = (value) => setResult(value);
  const [user, loading, error] = useAuthState(firebase.auth())

  useEffect(() => {
    if (user?.emailVerified) {
      const searchUser = async () => {
        return await DoRequest(
          "USER",
          `users/search?email=${user.email}`,
          {},
          "GET",
          false
        );
      }
      const getUserToken = async () => {
        return await DoRequest(
          "OAUTH",
          `oauth/token?username=${user.email}&password=${user.email}&grant_type=password`,
          {},
          "GET",
          false
        );
      }
      searchUser()
        .then((resp) => {
          getUserToken()
            .then((resp) => {
              router.push("/PropertySearch");
            })
        })
    }
  }, [user])

  return (
    <>
      <Grid container>
        <LoginCard validationFunction={getResult} />
      </Grid>
    </>
  );
};
export default Login;

