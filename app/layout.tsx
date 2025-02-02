import { ReactElement } from "react";
import "@/assets/styles/globals.css";

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
