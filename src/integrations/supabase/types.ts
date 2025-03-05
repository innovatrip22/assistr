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
      announcements: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          check_in_date: string
          check_out_date: string
          created_at: string | null
          guests: number
          id: string
          place_id: string
          status: string
          total_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          guests: number
          id?: string
          place_id: string
          status?: string
          total_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          guests?: number
          id?: string
          place_id?: string
          status?: string
          total_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          name: string
          owner_id: string
          phone: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          name: string
          owner_id: string
          phone?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          name?: string
          owner_id?: string
          phone?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_bot: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_bot?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_bot?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          capacity: number | null
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          image_url: string | null
          location: string | null
          organizer_id: string | null
          price: number | null
          start_date: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          image_url?: string | null
          location?: string | null
          organizer_id?: string | null
          price?: number | null
          start_date: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          image_url?: string | null
          location?: string | null
          organizer_id?: string | null
          price?: number | null
          start_date?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          business_id: string | null
          content: string
          created_at: string | null
          id: string
          rating: number | null
          title: string
          user_id: string
        }
        Insert: {
          business_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          rating?: number | null
          title: string
          user_id: string
        }
        Update: {
          business_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          rating?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string | null
          average_rating: number | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          phone: string | null
          type: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          average_rating?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          type: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          average_rating?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          type?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string
          id: string
          location: string | null
          priority: string
          status: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description: string
          id?: string
          location?: string | null
          priority?: string
          status?: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location?: string | null
          priority?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trip_activities: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          end_time: string | null
          id: string
          location: string | null
          order: number
          plan_id: string
          start_time: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          order: number
          plan_id: string
          start_time?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          order?: number
          plan_id?: string
          start_time?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_activities_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "trip_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_plans: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          interests: string[] | null
          notes: string | null
          start_date: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          interests?: string[] | null
          notes?: string | null
          start_date: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          interests?: string[] | null
          notes?: string | null
          start_date?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "tourist" | "business" | "institution"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
