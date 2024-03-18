import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import IssueStatusSelect from "./IssueStatusSelect";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2" align="center" justify="between">
        <IssueStatusSelect issue={issue} />
        <Text>{issue.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4" title="Description">
        <Heading size="4" mb="4">
          Description
        </Heading>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
