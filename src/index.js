import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Container, Paper, Typography } from "@mui/material";
import Fruit from "./Fruit.js";
import { areArraysEqual } from "@mui/base";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const init = async () => {
  if (supabase.auth.user() === undefined) return;

  const { data: inventories, error } = await supabase
    .from("inventories")
    .select("*")
    .eq("user_id", supabase.auth.user().id);

  console.log({ inventory: inventories[0] });

  return { inventory: inventories[0] };
};

export default function App() {
  const [session, setSession] = useState(null);
  const [inventory, setInventory] = useState({ fruit: { amount: 0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    init().then((e) => {
      console.log({fruit: e.inventory?.fruit ?? 0, e})
      setInventory({
        ...inventory,
        fruit: e.inventory?.fruit ?? 0,
      });
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lx">
        <Paper elevation={2} sx={{ height: "600px", marginTop: "50px" }}>
          {
            loading 
            ? null
            : <Fruit pickSpeed={500} fruit={inventory.fruit.amount} />
          }
        </Paper>
        {!session ? <Auth /> : null}
        <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
      </Container>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
