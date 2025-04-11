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
      cart_items: {
        Row: {
          cart_id: number
          created_at: string
          id: number
          product_variant_id: number
          quantity: number
          updated_at: string
        }
        Insert: {
          cart_id: number
          created_at?: string
          id?: number
          product_variant_id: number
          quantity?: number
          updated_at?: string
        }
        Update: {
          cart_id?: number
          created_at?: string
          id?: number
          product_variant_id?: number
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variations"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          name: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      collection_products: {
        Row: {
          collection_id: number
          created_at: string
          product_id: number
          updated_at: string
        }
        Insert: {
          collection_id: number
          created_at?: string
          product_id: number
          updated_at?: string
        }
        Update: {
          collection_id?: number
          created_at?: string
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      colours: {
        Row: {
          created_at: string
          hex_code: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          hex_code?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          hex_code?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          colour_id: number
          created_at: string
          id: number
          image_order: number
          image_url: string
          product_id: number
          updated_at: string
        }
        Insert: {
          colour_id: number
          created_at?: string
          id?: number
          image_order?: number
          image_url: string
          product_id: number
          updated_at?: string
        }
        Update: {
          colour_id?: number
          created_at?: string
          id?: number
          image_order?: number
          image_url?: string
          product_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_colour_id_fkey"
            columns: ["colour_id"]
            isOneToOne: false
            referencedRelation: "colours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_statuses: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_unit_statuses: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_units: {
        Row: {
          created_at: string
          id: number
          product_variant_id: number
          status_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_variant_id: number
          status_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          product_variant_id?: number
          status_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_units_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_units_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "product_unit_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variations: {
        Row: {
          colour_id: number
          created_at: string
          id: number
          product_id: number
          size_id: number
          updated_at: string
        }
        Insert: {
          colour_id: number
          created_at?: string
          id?: number
          product_id: number
          size_id: number
          updated_at?: string
        }
        Update: {
          colour_id?: number
          created_at?: string
          id?: number
          product_id?: number
          size_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variations_colour_id_fkey"
            columns: ["colour_id"]
            isOneToOne: false
            referencedRelation: "colours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variations_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          code: string | null
          created_at: string
          description: string | null
          id: number
          name: string
          purchased_price: number
          selling_price: number
          status_id: number | null
          subcategory_id: number | null
          supplier_id: number | null
          updated_at: string
        }
        Insert: {
          category_id?: number | null
          code?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          purchased_price: number
          selling_price: number
          status_id?: number | null
          subcategory_id?: number | null
          supplier_id?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: number | null
          code?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          purchased_price?: number
          selling_price?: number
          status_id?: number | null
          subcategory_id?: number | null
          supplier_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "product_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      sizes: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: number
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          category_id: number
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: number
          name: string
          phone_number: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone_number?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone_number?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_cart_item: {
        Args: { product_variant_id: number }
        Returns: undefined
      }
      delete_cart_item: {
        Args: { cart_item_id: number }
        Returns: undefined
      }
      get_cart_items: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          image_url: string
          name: string
          selling_price: number
          status: string
          quantity: number
          colour: string
          size: string
        }[]
      }
      get_cart_size: {
        Args: { user_id: string }
        Returns: number
      }
      get_product_by_code: {
        Args: { product_code: string }
        Returns: {
          code: string
          category_id: number
          subcategory_id: number
          name: string
          description: string
          purchased_price: number
          selling_price: number
          product_variant_id: number
          colour: string
          colour_hex: string
          images: string[]
          size: string
          size_description: string
          status_id: number
          quantity: number
        }[]
      }
      get_products: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          code: string
          category: string
          name: string
          purchased_price: number
          selling_price: number
          quantity: number
          available_colours: string[]
          available_sizes: string[]
        }[]
      }
      get_products_by_category: {
        Args: { category_slug: string }
        Returns: {
          id: number
          code: string
          category: string
          name: string
          purchased_price: number
          selling_price: number
          image_url: string
          quantity: number
          available_colours: string[]
          available_sizes: string[]
          status_id: number
          status: string
        }[]
      }
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
