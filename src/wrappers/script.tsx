import React from "react";
import useScript from "@/utils/useScript";

type Props = {
  props: any;
};

export default (props: Props) => {
  useScript("/__/firebase/8.1.1/firebase-app.js");
  useScript("/__/firebase/init.js");

  return <div>{props.children}</div>;
};
