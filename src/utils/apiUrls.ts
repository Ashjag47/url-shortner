import supabase from './supabase';

interface UrlResponse {
  id: number;
  created_at?: string;
  original_url?: string;
  short_url?: string;
  custom_url?: string;
  user_id?: string;
  title?: string;
  qr?: string;
}

export async function getUrls(
  userId: string | undefined
): Promise<UrlResponse[]> {
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    console.error(error.message);
    throw new Error('Failed to fetch urls');
  }
  return data;
}
