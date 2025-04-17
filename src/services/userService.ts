import { supabase } from "@/integrations/supabase/client";
import { initializePasswordTracking } from "./passwordService";

/**
 * Creates a default admin user with predefined credentials
 */
export const createDefaultAdminUser = async (): Promise<boolean> => {
  try {
    // Check if admin user already exists
    const { data: existingAdmins } = await supabase
      .from('profiles')  // Assuming we'll create a profiles table
      .select('*')
      .eq('role', 'admin');

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('Default admin user already exists');
      return false;
    }

    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@zenforce.martial.arts', // Use a service email for admin
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

/**
 * Creates a new password tracking record for a user
 * @param userId The ID of the user
 * @param expiryDays The number of days until the password expires (default: 30)
 */
export const initializePasswordTracking = async (userId: string, expiryDays: number = 30): Promise<boolean> => {
  try {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);
    
    const { error } = await supabase
      .from("password_tracking")
      .insert({
        user_id: userId,
        last_changed: now.toISOString(),
        expiry_date: expiryDate.toISOString(),
        reminder_sent: false,
        is_suspended: false
      });
    
    if (error) {
      console.error("Error initializing password tracking:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to initialize password tracking:", error);
    return false;
  }
};
