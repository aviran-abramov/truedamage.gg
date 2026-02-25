import * as z from "zod/v4/core";

export const createErrorMessage = (issues: z.$ZodIssue[]): string => {
  let errorMessage = "";

  issues.forEach((issue) => {
    errorMessage += `${issue.path}: ${issue.message}`;
  });

  return errorMessage;
};
