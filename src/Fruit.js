import { useState, useEffect } from "react";
import { Button, Container, Paper, Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { supabase } from "./supabaseClient";

let subscription = null;

export default function Fruit(props) {
  const [fruit, setFruit] = useState({
    amount: props.fruit ?? 0,
    canPick: true,
    pickSpeed: props.pickSpeed ?? 1000,
  });

  useEffect(() => {
    const func = () => {
        subscription = supabase
        .from(`inventories:user_id=eq.${supabase.auth.user().id}`)
        .on('UPDATE', (payload) => {
          setFruit({
            ...fruit,
            amount: payload.new.fruit.amount,
          });
          console.log({payload})
        })
        .subscribe((s) => console.log({subscription: s}));
    };

    if(supabase.auth.user() !== undefined && subscription === null){
        func();
    } 

    console.log({subCheck: {subscription}})

  }, [fruit]);

  const pickFruit = async () => {
    if (!fruit.canPick) return;
    setFruit({
      ...fruit,
      canPick: false,
    });

    const { data: inventories , Aerror } = await supabase
        .from('inventories')
        .select('*')
        .eq('user_id', supabase.auth.user().id);

    console.log({ inventories , Aerror })

    if(inventories.length === 0 && Aerror === undefined)    {
        const { data, error } = await supabase
        .from("inventories")
        .insert({ user_id: supabase.auth.user().id, fruit: { amount: fruit.amount + 1 } });

        console.log({type: 'insert', data, error})
    } else {
        const { data, error } = await supabase
        .from("inventories")
        .update({ user_id: supabase.auth.user().id, fruit: { amount: fruit.amount + 1 } })
        .eq('user_id', supabase.auth.user().id);

        console.log({type: 'update',data, error})
    }

    setFruit({
      ...fruit,
      canPick: true,
    });
  };

  return (
    <Paper sx={{ padding: "8px", maxWidth: "200px" }}>
      <Typography align="center" sx={{ marginBottom: "8px" }}>
        FRUIT
      </Typography>
      <Typography>Amount: {fruit.amount}</Typography>
      <Typography>Pick Speed: {fruit.pickSpeed / 1000}/s</Typography>
      <Typography>Can Pick: {fruit.canPick.toString()}</Typography>
      <Box sx={{ position: "relative" }}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={() => pickFruit()}
          disabled={!fruit.canPick}
        >
          Pick
        </Button>
        {!fruit.canPick && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Paper>
  );
}
