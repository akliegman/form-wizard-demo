"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "react-aria-components";

import { useUser } from "@/app/hooks/user";
import { AvatarIcon } from "@/app/ui/icons/avatar";

import styles from "./styles.module.scss";

export const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname === "/data";
  const isData = pathname === "/data";

  const { user, logout } = useUser();

  return (
    <header className={clsx(styles.header, isAdmin && styles.admin)}>
      <Link className={styles.home} href="/">
        Form Demo
      </Link>
      {isAdmin && <span className={styles.adminLogo}>Admin Mode</span>}
      <nav className={styles.nav}>
        {isAdmin && !isData ? (
          <Link className={styles.link} href="/data">
            User Data
          </Link>
        ) : (
          <Link className={styles.link} href="/admin">
            Admin
          </Link>
        )}
      </nav>
      {user && (
        <span className={styles.user}>
          <AvatarIcon className={styles.avatar} />
          <span className={styles.userInfo}>
            <span className={styles.userEmail}>{user.email}</span>
            <Button className={styles.logoutButton} onPress={logout}>
              Log out
            </Button>
          </span>
        </span>
      )}
    </header>
  );
};
