import React from "react";
import FacebookLogin from "react-facebook-login";
import loginStyles from "../styles/Login.module.css";

export default function FacebookLoginButton(props) {
  return (
    <FacebookLogin
      appId="574826850471385"
      autoLoad={props.clicked}
      fields="name,email,picture"
      textButton={"Entrar com Facebook"}
      cssClass={loginStyles.facebookLoginButton}
      callback={(resp) => console.log(resp)}
    />
  );
}
