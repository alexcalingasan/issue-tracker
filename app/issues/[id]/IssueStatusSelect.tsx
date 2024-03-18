"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const statuses: { label: string; value: string }[] = [
  { label: "Open", value: Status.OPEN },
  { label: "In Progress", value: Status.IN_PROGRESS },
  { label: "Closed", value: Status.CLOSED },
];

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const onStatusChange = async (status: Status) => {
    try {
      await axios.patch("/api/issues/" + issue.id, { status });
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.")
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status: Status) => onStatusChange(status)}
      >
        <Select.Trigger placeholder="Select status..." />
        <Select.Content>
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default IssueStatusSelect;
