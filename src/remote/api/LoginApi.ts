import supabase from '../Supabase';

export const signInWithGithub = async (redirectURL: string) => {
  return await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${redirectURL}`,
    },
  });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[SignOut Error] ", error);
  }
};
