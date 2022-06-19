import { useState, useEffect } from "react";
import { Delay } from './Utils.js'
import { Button, Paper, Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { FileUploadRounded } from "@mui/icons-material";

export default function FruitCard({name, amount, pickSpeed, canPick, pickFruit}) {
  return (
    <Paper sx={{ padding: "8px", maxWidth: "200px" }}>
      <Typography align="center" sx={{ marginBottom: "8px" }}>
        {name}
      </Typography>
      <Typography>Amount: {amount}</Typography>
      <Typography>Pick Speed: {pickSpeed / 1000}/s</Typography>
      <Typography>Can Pick: {canPick.toString()}</Typography>
      <Box sx={{ position: "relative" }}>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={async () => {console.log(pickFruit);await pickFruit('boop')}}
          disabled={!canPick}
        >
          Pick
        </Button>
        {!canPick && (
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
