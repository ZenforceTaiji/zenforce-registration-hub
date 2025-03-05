
// Supabase Edge Function to check for expiring passwords and send reminders
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    // Create a Supabase client with the service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get current date
    const now = new Date();
    
    // Find users whose passwords expire within 7 days and haven't been sent a reminder
    const { data: usersToRemind, error: remindError } = await supabase
      .from("password_tracking")
      .select("*, profiles(email, full_name)")
      .eq("reminder_sent", false)
      .eq("is_suspended", false)
      .lte("expiry_date", new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .gte("expiry_date", now.toISOString());
    
    if (remindError) {
      console.error("Error fetching users to remind:", remindError);
      throw remindError;
    }
    
    // Find users whose passwords have expired and need to be suspended
    const { data: usersToSuspend, error: suspendError } = await supabase
      .from("password_tracking")
      .select("user_id")
      .eq("is_suspended", false)
      .lt("expiry_date", now.toISOString());
    
    if (suspendError) {
      console.error("Error fetching users to suspend:", suspendError);
      throw suspendError;
    }
    
    console.log(`Found ${usersToRemind?.length || 0} users to remind and ${usersToSuspend?.length || 0} users to suspend`);
    
    // Send reminders and mark as sent
    for (const user of usersToRemind || []) {
      // In a real implementation, send an email here
      console.log(`Sending reminder to ${user.profiles?.email}: Password will expire on ${new Date(user.expiry_date).toLocaleDateString()}`);
      
      // Mark reminder as sent
      const { error: updateError } = await supabase
        .from("password_tracking")
        .update({ reminder_sent: true })
        .eq("id", user.id);
        
      if (updateError) {
        console.error(`Error updating reminder status for user ${user.user_id}:`, updateError);
      }
    }
    
    // Suspend accounts for expired passwords
    for (const user of usersToSuspend || []) {
      console.log(`Suspending account for user ${user.user_id} due to expired password`);
      
      // Mark account as suspended
      const { error: updateError } = await supabase
        .from("password_tracking")
        .update({ is_suspended: true })
        .eq("user_id", user.user_id);
        
      if (updateError) {
        console.error(`Error suspending user ${user.user_id}:`, updateError);
      }
    }
    
    return new Response(
      JSON.stringify({
        message: "Password check completed",
        reminded: usersToRemind?.length || 0,
        suspended: usersToSuspend?.length || 0,
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in password expiry check:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
