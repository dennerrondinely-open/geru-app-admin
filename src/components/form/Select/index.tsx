import {
  Box,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import type { ChangeEvent } from "react";

interface SelectProps {
  label?: string;
  icon?: React.ReactNode;
  items: Array<{ label: string; value: string | number }>;
  value?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
}

export const Select = ({
  label,
  icon,
  items,
  value,
  onChange,
}: SelectProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <InputLabel
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {icon} {label}
      </InputLabel>
      <MUISelect
        value={value ?? ""}
        size="small"
        onChange={onChange}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MUISelect>
    </Box>
  );
};
