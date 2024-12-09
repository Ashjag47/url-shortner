import UrlResponse from '@/models/UrlResponse';
import supabase from './supabase';

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

export async function deleteUrl(id: number | undefined) {
  const { data, error } = await supabase.from('urls').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    throw new Error('Failed to fetch urls');
  }
  return data;
}

interface CreateUrlRequest {
  title: string;
  longUrl: string;
  customUrl: string;
  userId: string;
}

export async function createUrl(
  request: CreateUrlRequest,
  qrCode: string
): Promise<UrlResponse[]> {
  const shortUrl = Math.random().toString(36).substring(3, 7);
  const fileName = `qr-${shortUrl}-${Date.now()}`;

  const { error: storageError } = await supabase.storage
    .from('qr')
    .upload(fileName, qrCode);

  if (storageError) {
    console.error(storageError.message);
    throw new Error('Failed to upload QR code');
  }

  const qr = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/qr/${fileName}`;

  const { data, error } = await supabase
    .from('urls')
    .insert([
      {
        title: request.title,
        original_url: request.longUrl,
        short_url: shortUrl,
        custom_url: request.customUrl,
        user_id: request.userId,
        qr,
      },
    ])
    .select('*');

  if (error) {
    console.error(error.message);
    throw new Error('Failed to create url');
  }

  return data;
}
