"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

import { fetchAllUsers } from "@/app/lib/api/users";
import { User } from "@/app/lib/definitions";
import { Spinner } from "@/app/ui/spinner";

import styles from "./styles.module.scss";

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllUsers().then((data) => {
      if (!data.error) {
        setUsers(data?.users?.rows);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div className={styles.container}>
      <Table aria-label="User Data" className={styles.table}>
        <TableHeader>
          <Row>
            <Column isRowHeader>ID</Column>
            <Column>User ID</Column>
            <Column>Email</Column>
            <Column>About Me</Column>
            <Column>Street Address</Column>
            <Column>City</Column>
            <Column>State</Column>
            <Column>Zip</Column>
            <Column>Birthdate</Column>
            <Column>Created At</Column>
            <Column>Updated At</Column>
          </Row>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const birthdate = user.birthdate
              ? new Date(user.birthdate).toLocaleDateString()
              : "";
            const createdAt = user.created_at
              ? new Date(user.created_at).toLocaleString()
              : "";
            const updatedAt = user.updated_at
              ? new Date(user.updated_at).toLocaleString()
              : "";

            return (
              <Row key={user.user_id}>
                <Cell>{user.id}</Cell>
                <Cell>{user.user_id}</Cell>
                <Cell>{user.email}</Cell>
                <Cell className={clsx(styles.preLine, styles.minWidth)}>
                  {user.about_me}
                </Cell>
                <Cell>{user.street_address}</Cell>
                <Cell>{user.city}</Cell>
                <Cell>{user.state}</Cell>
                <Cell>{user.zip}</Cell>
                <Cell>{birthdate}</Cell>
                <Cell>{createdAt}</Cell>
                <Cell>{updatedAt}</Cell>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
