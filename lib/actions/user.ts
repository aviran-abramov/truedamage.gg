"use server";

import { auth } from "../auth";
import { createErrorMessage } from "../helpers/zod";
import { UserSchema } from "../validators/user";
import { ActionResult } from "../types/actions";

export async function createUser(data: unknown): Promise<ActionResult> {
  try {
    const result = UserSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: createErrorMessage(result.error.issues),
      };
    }

    const { name, email, password, role } = result.data;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Error: Could not sign up the new user via admin form",
      error
    );
    return {
      success: false,
      error: "Failed to create user.",
    };
  }
}
