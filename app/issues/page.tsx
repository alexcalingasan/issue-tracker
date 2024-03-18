import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: IssueQuery;
}) => {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = {status};

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;


  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({where});

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}  />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - List',
  description: 'View a list of project issues'
};