import supabase from './supabase';

interface ClickResponse {
  id: number;
  created_at?: string;
  url_id?: number;
  city?: string;
  country?: string;
  device?: string;
}

export async function getClicksForUrls(
  urlIds: number[]
): Promise<ClickResponse[]> {
  const { data, error } = await supabase
    .from('clicks')
    .select('*')
    .in('url_id', urlIds);
  if (error) {
    console.error(error.message);
    throw new Error('Failed to fetch clicks');
  }
  return data;
}
