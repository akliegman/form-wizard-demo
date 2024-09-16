import { Metadata } from "next";

import { UserTable } from "@/app/ui/admin/user-table";
import { PageContainer } from "@/app/ui/page-container";

export const metadata: Metadata = {
  title: "User Data",
};

export default function DataPage() {
  return (
    <PageContainer layout="full">
      <UserTable />
    </PageContainer>
  );
}
