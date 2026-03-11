"use client";

import { TextField, InputAdornment } from "@mui/material";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  type?: string;
}

export const Input = ({ label, value, onChange, icon, type = "text" }: InputProps) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    type={type}
    fullWidth
    size="small"
    InputProps={icon ? { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> } : undefined}
  />
);
