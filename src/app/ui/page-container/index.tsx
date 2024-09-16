"use client";

import clsx from "clsx";

import { Header } from "@/app/ui/header";

import styles from "./styles.module.scss";

interface PageContainerProps {
  children: React.ReactNode;
  layout?: "default" | "full";
}

export const PageContainer = ({
  children,
  layout = "default",
}: PageContainerProps) => {
  return (
    <main className={clsx(styles.main, layout === "full" && styles.fullWidth)}>
      <Header />
      <div className={styles.container}>{children}</div>
    </main>
  );
};
