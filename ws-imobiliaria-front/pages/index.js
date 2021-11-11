import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const home = () => {
  const router = useRouter();

  useEffect(() => {
      router.push("/Login")
  }, []);

  return (
    <>
    </>
  );
};
export default home;