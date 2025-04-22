
import { supabase } from "@/integrations/supabase/client";
import { initializePasswordTracking } from "./passwordService";

/**
 * Creates a default admin user with predefined credentials
 */
export const createDefaultAdminUser = async (): Promise<boolean> => {
  try {
    // Check if admin user already exists
    const { data: existingAdmins } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin');

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('Default admin user already exists');
      return false;
    }

    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email: 'zenforce786@gmail.com', // Updated email address
      password: 'Zaydaan200@@',
      options: {
        data: {
          username: 'ShifuZaya',
          role: 'admin'
        }
      }
    });

    if (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }

    if (data.user) {
      // Initialize password tracking for the admin user
      await initializePasswordTracking(data.user.id, 365); // 1-year password expiry for admin
      
      console.log('Default admin user created successfully');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to create default admin user:', error);
    return false;
  }
};
