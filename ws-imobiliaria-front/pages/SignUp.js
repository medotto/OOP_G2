import React, { } from "react";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import SignUpCard from "../components/SignUpCard";
import { useDispatch } from "react-redux";

const SignUp = () => {
  return (
    <>
      <Grid container>
        <SignUpCard/>
      </Grid>
    </>
  );
};
export default SignUp;

