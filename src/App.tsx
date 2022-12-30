import React, { useEffect, useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { BrowserRouter, useParams } from "react-router-dom";
import { Nav } from "./Components/Layout/Nav/Nav";
import { Router } from "./Components/Layout/Router/Router";
import { Breadcrumbs } from "./Components/Layout/Breadcrumbs/Breadcrumbs";
import { Head } from "./Components/Layout/Head/Head";
import { useAppDispatch, useAppSelector } from "./State/hooks";
import {
  getWeek,
  setCurDayAndWeek,
} from "./State/Slices/scheduleSettingsSlice";
import { TopDot } from "./Components/TopDot/TopDot";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurDayAndWeek());
  }, []);

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <Layout className="site-layout">
          <Head />
          <Content style={{ margin: "0 16px" }}>
            <Router />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
