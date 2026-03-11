"use client";

import { FormControlLabel, Switch as MuiSwitch } from "@mui/material";

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange: (value: boolean) => void;
  color?: "primary" | "secondary" | "success" | "error";
}

export const Switch = ({ label, checked = false, onChange, color = "primary" }: SwitchProps) => (
  <FormControlLabel
    control={<MuiSwitch checked={checked} onChange={(e) => onChange(e.target.checked)} color={color} />}
    label={label}
  />
);
