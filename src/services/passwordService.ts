
import { supabase } from "@/integrations/supabase/client";

interface PasswordStatus {
  isExpired: boolean;
  isSuspended: boolean;
  daysUntilExpiry: number | null;
  lastChanged: Date | null;
  expiryDate: Date | null;
}

export const checkPasswordStatus = async (userId: string): Promise<PasswordStatus> => {
  try {
    const { data, error } = await supabase
      .from("password_tracking")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    if (error) {
      console.error("Error checking password status:", error);
      throw error;
    }
    
    if (!data) {
      return {
        isExpired: false,
        isSuspended: false,
        daysUntilExpiry: null,
        lastChanged: null,
        expiryDate: null
      };
    }
    
    const now = new Date();
    const expiryDate = new Date(data.expiry_date);
    const lastChanged = new Date(data.last_changed);
    
    // Calculate days until expiry
    const diffTime = expiryDate.getTime() - now.getTime();
    const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      isExpired: now > expiryDate,
      isSuspended: data.is_suspended,
      daysUntilExpiry: daysUntilExpiry,
      lastChanged: lastChanged,
      expiryDate: expiryDate
    };
  } catch (error) {
    console.error("Failed to check password status:", error);
    // Return default values in case of error
    return {
      isExpired: false,
      isSuspended: false,
      daysUntilExpiry: null,
      lastChanged: null,
      expiryDate: null
    };
  }
};

export const updatePassword = async (userId: string, newPassword: string): Promise<boolean> => {
  try {
    // Update the password in auth
    const { error: authError } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (authError) {
      console.error("Error updating password:", authError);
      throw authError;
    }
    
    // Update the expiry date in our tracking table
    const now = new Date();
    const expiryDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    const { error: trackingError } = await supabase
      .from("password_tracking")
      .update({
        last_changed: now.toISOString(),
        expiry_date: expiryDate.toISOString(),
        reminder_sent: false,
        is_suspended: false
      })
      .eq("user_id", userId);
    
    if (trackingError) {
      console.error("Error updating password tracking:", trackingError);
      throw trackingError;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to update password:", error);
    return false;
  }
};
