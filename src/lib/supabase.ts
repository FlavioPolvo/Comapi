import { createClient } from "@supabase/supabase-js";
<<<<<<< Updated upstream
import type { Database } from "@/types/supabase";

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getProducers() {
  const { data, error } = await supabase
    .from("producers")
    .select("*")
    .order("nome_completo", { ascending: true });

  if (error) {
    console.error("Error fetching producers:", error);
    return [];
  }

  return data || [];
}

export async function getEntries() {
  const { data, error } = await supabase
    .from("entries")
    .select(
      `
      *,
      producers:producer_id(id, nome_completo, municipality, community)
    `,
    )
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching entries:", error);
    return [];
  }

  return data || [];
}

export async function getMunicipalities() {
  const { data, error } = await supabase
    .from("municipalities")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching municipalities:", error);
    return [];
  }

  return data || [];
}

export async function getColors() {
  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .order("code", { ascending: true });

  if (error) {
    console.error("Error fetching colors:", error);
    return [];
  }

  return data || [];
}

export async function saveProducer(producer: any) {
  const { data, error } = await supabase
    .from("producers")
    .upsert(producer)
    .select();

  if (error) {
    console.error("Error saving producer:", error);
    throw error;
  }

  return data?.[0];
}

export async function saveEntry(entry: any) {
  const { data, error } = await supabase.from("entries").upsert(entry).select();

  if (error) {
    console.error("Error saving entry:", error);
    throw error;
  }

  return data?.[0];
=======

// Define a simple Database type to avoid the import error
type Database = any;

// Create a single supabase client for interacting with your database
const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

// Create client with placeholder values if real ones aren't available
// This allows the app to initialize without errors, and the SupabaseConfig component
// will prompt the user to configure real credentials
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getProducers() {
    const { data, error } = await supabase
        .from("producers")
        .select("*")
        .order("nome_completo", { ascending: true });

    if (error) {
        console.error("Error fetching producers:", error);
        return [];
    }

    return data || [];
}

export async function getEntries() {
    const { data, error } = await supabase
        .from("entries")
        .select(
            `
      *,
      producers:producer_id(id, nome_completo, municipality, community)
    `,
        )
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching entries:", error);
        return [];
    }

    return data || [];
}

export async function getMunicipalities() {
    const { data, error } = await supabase
        .from("municipalities")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching municipalities:", error);
        return [];
    }

    return data || [];
}

export async function getColors() {
    const { data, error } = await supabase
        .from("colors")
        .select("*")
        .order("code", { ascending: true });

    if (error) {
        console.error("Error fetching colors:", error);
        return [];
    }

    return data || [];
}

export async function saveProducer(producer: any) {
    const { data, error } = await supabase
        .from("producers")
        .upsert(producer)
        .select();

    if (error) {
        console.error("Error saving producer:", error);
        throw error;
    }

    return data?.[0];
}

export async function saveEntry(entry: any) {
    const { data, error } = await supabase.from("entries").upsert(entry).select();

    if (error) {
        console.error("Error saving entry:", error);
        throw error;
    }

    return data?.[0];
>>>>>>> Stashed changes
}
