import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  ButtonGroup,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CollectCard from "./CollectCard.js";
import { Delay, FormatDate, FormatTime, ToObjectList } from "./Utils.js";
import Item from "./Item.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const initialise = () => {
  return {
    Inventory: {
      Items: {
        Strawberry: new Item("Strawberry", 0)
      },
    },
    ActivePage: "field"
  };
};

export default function App() {
  const [gameData, setGameData] = useState(initialise());
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Delay(100).then(() => setLoading(false));
    setInterval(() => {
      setDate(new Date());
    }, 100)
  }, []);

  useEffect(() => {}, [gameData]);

  const CollectItem = async (item) => {
    console.log(item);
    item.SetCanCollect(false);
    setGameData({ ...gameData });

    await Delay(item.CollectSpeed);

    item.SetCanCollect(true);
    item.Collect();
    setGameData({ ...gameData });
  };

  const SetActivePage = (page) => {
    setGameData({
      ...gameData,
      ActivePage: page,
    });
  };

  const GetPage = (page) => {
    switch (page) {
      case "field":
        return FieldPage();
      default:
        return Page();
    }
  };

  const FieldPage = () => {
    return (
      <Stack direction={"row"} spacing={4}>
        {ToObjectList(gameData.Inventory.Items).map((item) => {
          return (
            <CollectCard
              name={item.Name}
              amount={item.Amount}
              collectSpeed={item.CollectSpeed}
              canCollect={item.CanCollect}
              collect={async (a) => await CollectItem(item)}
            />
          );
        })}
      </Stack>
    );
  };

  const Page = () => {
    return (
      <Typography>
        TBC
      </Typography>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lx" sx={{ pt: 4 }}>
        <ButtonGroup>
          <Button
            variant={gameData.ActivePage === "field" ? "contained" : "outlined"}
            sx={{ borderRadius: "4px 4px 0 0" }}
            onClick={() => SetActivePage("field")}
          >
            Field
          </Button>
          <Button
            variant={gameData.ActivePage === "home" ? "contained" : "outlined"}
            onClick={() => SetActivePage("home")}
          >
            Home stead
          </Button>
          <Button
            variant={gameData.ActivePage === "town" ? "contained" : "outlined"}
            onClick={() => SetActivePage("town")}
          >
            Town
          </Button>
          <Button
            variant={gameData.ActivePage === "city" ? "contained" : "outlined"}
            onClick={() => SetActivePage("city")}
          >
            City
          </Button>
          <Button
            variant={
              gameData.ActivePage === "country" ? "contained" : "outlined"
            }
            sx={{ borderRadius: "4px 4px 0 0" }}
            onClick={() => SetActivePage("country")}
          >
            Country
          </Button>
        </ButtonGroup>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 1 }}>
        <Paper elevation={2} sx={{ height: "600px", p: 4, width: { xs: '100%', sm: '80%' } }}>
          {loading ? null : GetPage(gameData.ActivePage)}
        </Paper>
        <Paper elevation={2} sx={{ height: "600px", p: 4, width: { xs: '100%', sm: '20%' } }}>
          <Typography>
            { FormatDate(date) }
          </Typography>
          <Typography>
            { FormatTime(date) }
          </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell align={'right'}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {
                  ToObjectList(gameData.Inventory.Items).map(item => {
                    return (
                      <TableRow>
                        <TableCell>
                          { item.Name }
                        </TableCell>
                        <TableCell align={'right'}>
                          { item.Amount }
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
                </TableBody>
              </Table>
            </TableContainer>
        </Paper>
        </Stack>
        <Button
          onClick={() => {
            console.log(gameData);
          }}
        >
          Click
        </Button>
      </Container>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
