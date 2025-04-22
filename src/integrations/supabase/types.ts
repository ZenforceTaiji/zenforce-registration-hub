export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      areas: {
        Row: {
          address: string
          city: string
          created_at: string
          id: string
          name: string
          postal_code: string | null
          province: string
          updated_at: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          name: string
          postal_code?: string | null
          province: string
          updated_at?: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          name?: string
          postal_code?: string | null
          province?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          class_id: string
          created_at: string
          id: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          booking_date: string
          class_id: string
          created_at?: string
          id?: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          booking_date?: string
          class_id?: string
          created_at?: string
          id?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          level: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          level: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          level?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      class_schedule: {
        Row: {
          class_id: string
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean
          start_time: string
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean
          start_time: string
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_schedule_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          area_id: string
          capacity: number
          created_at: string
          description: string | null
          id: string
          instructor_id: string
          level: string
          name: string
          updated_at: string
        }
        Insert: {
          area_id: string
          capacity: number
          created_at?: string
          description?: string | null
          id?: string
          instructor_id: string
          level: string
          name: string
          updated_at?: string
        }
        Update: {
          area_id?: string
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          instructor_id?: string
          level?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attendance_status: string | null
          created_at: string
          event_id: string
          id: string
          registration_date: string
          student_id: string
          updated_at: string
        }
        Insert: {
          attendance_status?: string | null
          created_at?: string
          event_id: string
          id?: string
          registration_date?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          attendance_status?: string | null
          created_at?: string
          event_id?: string
          id?: string
          registration_date?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          area_id: string | null
          capacity: number | null
          created_at: string
          description: string | null
          end_time: string
          event_date: string
          id: string
          image_url: string | null
          is_public: boolean
          location: string
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          area_id?: string | null
          capacity?: number | null
          created_at?: string
          description?: string | null
          end_time: string
          event_date: string
          id?: string
          image_url?: string | null
          is_public?: boolean
          location: string
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          area_id?: string | null
          capacity?: number | null
          created_at?: string
          description?: string | null
          end_time?: string
          event_date?: string
          id?: string
          image_url?: string | null
          is_public?: boolean
          location?: string
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_items: {
        Row: {
          area_id: string | null
          created_at: string
          description: string | null
          file_type: string
          file_url: string
          id: string
          instructor_id: string | null
          is_public: boolean
          title: string
          updated_at: string
        }
        Insert: {
          area_id?: string | null
          created_at?: string
          description?: string | null
          file_type: string
          file_url: string
          id?: string
          instructor_id?: string | null
          is_public?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          area_id?: string | null
          created_at?: string
          description?: string | null
          file_type?: string
          file_url?: string
          id?: string
          instructor_id?: string | null
          is_public?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_items_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_items_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          area_id: string | null
          bio: string | null
          certification_level: string
          created_at: string
          email: string
          first_name: string
          id: string
          is_active: boolean
          last_name: string
          phone: string | null
          profile_image_url: string | null
          updated_at: string
          user_id: string | null
          years_experience: number
        }
        Insert: {
          area_id?: string | null
          bio?: string | null
          certification_level: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_active?: boolean
          last_name: string
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          years_experience: number
        }
        Update: {
          area_id?: string | null
          bio?: string | null
          certification_level?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean
          last_name?: string
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "instructors_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_forms: {
        Row: {
          created_at: string
          has_medical_conditions: boolean
          id: string
          medical_conditions_details: string | null
          par_q_completed: boolean
          par_q_date: string | null
          physician_name: string | null
          physician_phone: string | null
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          has_medical_conditions?: boolean
          id?: string
          medical_conditions_details?: string | null
          par_q_completed?: boolean
          par_q_date?: string | null
          physician_name?: string | null
          physician_phone?: string | null
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          has_medical_conditions?: boolean
          id?: string
          medical_conditions_details?: string | null
          par_q_completed?: boolean
          par_q_date?: string | null
          physician_name?: string | null
          physician_phone?: string | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_forms_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string
          description: string | null
          duration_months: number
          id: string
          is_active: boolean
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_months: number
          id?: string
          is_active?: boolean
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          status: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          status?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          status?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      newsletters: {
        Row: {
          content: string
          created_at: string
          featured: boolean | null
          id: string
          image_url: string | null
          published_at: string | null
          status: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          status?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      password_tracking: {
        Row: {
          expiry_date: string
          id: string
          is_suspended: boolean
          last_changed: string
          reminder_sent: boolean
          user_id: string
        }
        Insert: {
          expiry_date: string
          id?: string
          is_suspended?: boolean
          last_changed?: string
          reminder_sent?: boolean
          user_id: string
        }
        Update: {
          expiry_date?: string
          id?: string
          is_suspended?: boolean
          last_changed?: string
          reminder_sent?: boolean
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          invoice_number: string | null
          payment_date: string
          payment_method: string
          payment_status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          payment_date?: string
          payment_method: string
          payment_status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          payment_date?: string
          payment_method?: string
          payment_status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          username?: string
        }
        Relationships: []
      }
      student_certificates: {
        Row: {
          certificate_file_url: string | null
          certificate_id: string
          created_at: string
          id: string
          instructor_id: string
          issue_date: string
          student_id: string
          updated_at: string
        }
        Insert: {
          certificate_file_url?: string | null
          certificate_id: string
          created_at?: string
          id?: string
          instructor_id: string
          issue_date: string
          student_id: string
          updated_at?: string
        }
        Update: {
          certificate_file_url?: string | null
          certificate_id?: string
          created_at?: string
          id?: string
          instructor_id?: string
          issue_date?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_certificates_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_certificates_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_certificates_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_memberships: {
        Row: {
          created_at: string
          end_date: string
          id: string
          membership_id: string
          payment_id: string | null
          start_date: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          membership_id: string
          payment_id?: string | null
          start_date: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          membership_id?: string
          payment_id?: string | null
          start_date?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_memberships_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_memberships_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_memberships_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          area_id: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          id: string
          is_active: boolean
          last_name: string
          medical_conditions: string | null
          phone: string | null
          profile_image_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          area_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          id?: string
          is_active?: boolean
          last_name: string
          medical_conditions?: string | null
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          area_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          id?: string
          is_active?: boolean
          last_name?: string
          medical_conditions?: string | null
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
