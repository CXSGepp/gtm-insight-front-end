import { Box, BoxProps } from "@mui/material";
import color from "color";

export interface GlassCardProps extends BoxProps {
  color?: string;
  noBorders?: boolean;
  square?: boolean;
  blur?: number;
}

export function GlassCard(props: GlassCardProps) {
  const {
    color: c = "#0D0D0D",
    blur = 9,
    noBorders,
    square,
    sx, 
    ...rest
  } = props;

  const glassSx = {
    backgroundColor: color(c).alpha(.1).toString(),
    backgroundImage: `linear-gradient(to bottom right, ${color(c)
      .alpha(0.2)
      .toString()}, ${color(c).alpha(0.5).toString()})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`, // Para compatibilidad con Safari
    boxShadow: "10px 10px 20px rgba(0, 0, 0, .7)",
    ...(!noBorders && {
      border: `1px solid ${color(c).alpha(0.9).toString()}`,
    }),
    ...(!square && {
      borderRadius: 2, // theme.spacing(2)
    }),
  };

  return (
    <Box
      // Fusionamos los estilos del glass card con cualquier estilo que se pase desde fuera
      sx={{ ...glassSx, ...sx }}
      {...rest}
    />
  );
}