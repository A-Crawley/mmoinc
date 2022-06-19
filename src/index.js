import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import FruitCard from "./FruitCard.js";
import { areArraysEqual } from "@mui/base";
import { Delay, ToObjectList } from "./Utils.js";
import Fruit from "./Fruit.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const initialise = () => {
  return {
    Inventory: {
      Fruit: {
        Berry: new Fruit('Berry',0),
        Apple: new Fruit('Apple',0),
        Banana: new Fruit('Banana',0),
        Mango: new Fruit('Mango',0),
        Kiwi: new Fruit('Kiwi',0),
        Orange: new Fruit('Orange',0),
        Coconut: new Fruit('Coconut',0),
      }
    }
  };
}

export default function App() {
  const [gameData, setGameData] = useState(initialise());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Delay(100).then(() => 
    setLoading(false));
  }, []);

  useEffect(() => {
  }, [gameData]);

  const PickFruit = async (fruit) => {
    console.log(fruit)
    let tempFruit = fruit.SetCanPick(false);
    setGameData({...gameData, Inventory: {...gameData.Inventory, ...tempFruit }});

    await Delay(fruit.PickSpeed);

    tempFruit = fruit.SetCanPick(true);
    tempFruit = fruit.Pick();
    setGameData({...gameData, Inventory: {...gameData.Inventory, ...tempFruit }});
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lx">
        <Paper elevation={2} sx={{ height: "600px", marginTop: "50px", p: 4 }}>
          {
            loading ? null : (
              <Stack direction={'row'} spacing={4}>
                {
                  ToObjectList(gameData.Inventory.Fruit).map(fruit => {
                    return (
                      <FruitCard name={fruit.Name} 
                                 amount={fruit.Amount} 
                                 pickSpeed={fruit.PickSpeed} 
                                 canPick={fruit.CanPick} 
                                 pickFruit={async (a) => await PickFruit(fruit)} />
                    )
                  })
                }
              </Stack>
            )
          }
        </Paper>
        <Button onClick={() => {console.log(gameData)}}>Click</Button>
      </Container>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
