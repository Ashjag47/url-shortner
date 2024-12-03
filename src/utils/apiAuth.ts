import supabase from './supabase';

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  if (error) {
    throw new Error(error.message);
  }
  return session.session.user;
}

export async function signup(
  email: string,
  password: string,
  name: string,
  profilePic: string | null = null
) {
  // store the profile pic in the storage of supabase
  const fileName = profilePic && `dp-${name.replace(/\s/g, '-')}-${Date.now()}`;
  if (profilePic && fileName) {
    const { error: fileError } = await supabase.storage
      .from('profilePic')
      .upload(fileName, profilePic);
    if (fileError) {
      throw new Error(fileError.message);
    }
  }

  // sign up the user
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilePic: fileName
          ? `${supabaseUrl}/storage/v1/object/public/profilePic/${fileName}`
          : null,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
