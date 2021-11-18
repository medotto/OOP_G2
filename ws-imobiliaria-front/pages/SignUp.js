import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import SignUpCard from "../components/SignUpCard";
import DoRequest from "../services/ReqService";
import ApiType from "../services/ApiType";
import { providers } from "../components/SocialMediaAuth";
import socialMediaAuth from "../services/Auth";
import { Button } from "@material-ui/core";

const SignUp = () => {
  const router = useRouter();
  const [result, setResult] = useState(false);
  const getResult = (value) => setResult(value);
  const [userRole, setUserRole] = useState(3);
  const [user, loading, error] = useAuthState(firebase.auth())
  const userF = firebase.auth().app

  const handleClick = () => {
    let res = socialMediaAuth(providers[0]);
    console.log(res)
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  // useEffect(() => {
  //   if (user?.emailVerified) {
  //     const searchUser = async () => {
  //       return await DoRequest(
  //         "USER",
  //         `users/search?email=${user.email}`,
  //         {},
  //         "GET",
  //         false
  //       );
  //     }
  //     const signUpUser = async () => {
  //       return await DoRequest(
  //         "USER",
  //         "users",
  //         {
  //           nome: user.displayName,
  //           email: user.email,
  //           password: user.email,
  //           roleList: [{
  //             id: userRole
  //           }]
  //         },
  //         "POST",
  //         false
  //       );
  //     }
  //     searchUser()
  //       .then((resp) => {
  //         router.push("/PropertySearch");
  //       })
  //       .catch(() => {
  //         signUpUser()
  //           .then((resp) => {
  //             router.push("/PropertySearch");
  //           })
  //       });
  //   }
  // }, [user])

  return (
    <>
      <Grid container>
        <SignUpCard validationFunction={getResult} setUserRole={setUserRole} userRole={userRole} />
      </Grid>
    </>
  );
};
export default SignUp;

