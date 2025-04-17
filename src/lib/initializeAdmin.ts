
import { createDefaultAdminUser } from "@/services/userService";

export const initializeAdminUser = async () => {
  try {
    await createDefaultAdminUser();
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};
