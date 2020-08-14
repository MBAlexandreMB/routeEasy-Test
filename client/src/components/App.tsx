import * as React from "react";
export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App = () => {
  return (
    <h1>
      Hello, world!!
    </h1>
  );
);