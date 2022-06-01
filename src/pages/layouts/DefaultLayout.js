import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* Header section */}
      <Header />

      {/* Main section */}
      <div className="main">{children}</div>

      {/* Footer section */}
      <Footer />
    </div>
  );
};
