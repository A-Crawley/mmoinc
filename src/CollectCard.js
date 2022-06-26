import { Button, Paper, Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

export default function CollectCard({name, amount, collectSpeed, canCollect, collect}) {
  return (
    <Paper sx={{ padding: "8px", width: { xs: '100%', sm: '200px'} , maxWidth: { xs: '100%', sm: "200px" } }}>
      <Typography align="center" sx={{ marginBottom: "8px" }}>
        {name}
      </Typography>
      <Typography>Amount: {amount}</Typography>
      <Typography>Collect Speed: {collectSpeed / 1000}/s</Typography>
      <Typography>Can Collect: {canCollect.toString()}</Typography>
      <Box sx={{ position: "relative" }}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={async () => await collect()}
          disabled={!canCollect}
        >
          Pick
        </Button>
        {!canCollect && (
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
