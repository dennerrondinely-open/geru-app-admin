import { Box, InputLabel, Switch as MuiSwitch } from "@mui/material";

interface SwitchProps
  extends Omit<React.ComponentProps<typeof MuiSwitch>, "onChange"> {
  label?: string;
  icon?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({ label, icon, onChange, ...props }: SwitchProps) => {
  return (
    <Box>
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
      <MuiSwitch onChange={onChange} {...props} />
    </Box>
  );
};
