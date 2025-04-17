
import { supabase } from "@/integrations/supabase/client";

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
