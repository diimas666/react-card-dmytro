import React from "react";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MainLayout() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.mainWrapper}>
          <main className={styles.main}>
            <Outlet />
          </main>
          <footer className={styles.footer}>
            React Questions Cards Aplication | {year} <br />
            Made by Dima
          </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default MainLayout;
