import { Box, InputLabel, TextField } from "@mui/material";

interface InputProps extends Omit<React.ComponentProps<typeof TextField>, 'onChange'> {
  label?: string;
  icon?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, icon, onChange, ...rest }: InputProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <InputLabel
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {icon}
        {label}
      </InputLabel>
      <TextField variant="outlined" onChange={onChange} size="small" {...rest} />
    </Box>
  );
};
