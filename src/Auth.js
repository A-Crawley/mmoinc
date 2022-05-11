import { useState } from "react";
import { supabase } from "./supabaseClient";
import { Paper, TextField, Button, Stack } from "@mui/material";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email: `${username}@game`,
        password: password,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: `${username}@game`,
        password: password,
      });
      if (error) throw error;

      await supabase
      .from('users')
      .insert({user_id: supabase.auth.user().id, username: username});

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async (e) => {
    e?.preventDefault();

    console.log({ username:`${username}@game`, password})
  };

  return (
    <Paper elevation={2} sx={{ maxWidth: "700px", margin: "auto", p: 5 }}>
      <Stack sx={{ margin: "auto" }}>
        <TextField onChange={(e) => setUsername(e.target.value)} label="Username" />
        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" sx={{ mt: 2 }} />
        <Button
          sx={{ mt: 2 }}
          onClick={() => handleLogin()}
          variant="contained"
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => handleRegister()}
        >
          Register
        </Button>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleGuest()}>
          Continue as guest
        </Button>
      </Stack>
    </Paper>
  );
}
