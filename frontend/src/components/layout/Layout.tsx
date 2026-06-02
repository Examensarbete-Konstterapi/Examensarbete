import { type ReactNode } from "react";
import "./layout.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <div className="layout-container">{children}</div>;
};

export default Layout;
