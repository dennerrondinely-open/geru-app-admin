import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import type { Section } from "domains/section";

interface SectionPreviewProps {
  data?: Section;
}

// White card that mimics the app's section cards
const FakeCard = ({
  title,
  subtitle,
  value,
  description,
  detail,
  buttonLabel,
  buttonVariant = "contained",
  showInfo = false,
  dimmed = false,
  masked = false,
}: {
  title: string;
  subtitle?: string;
  value?: string;
  description?: string;
  detail?: string;
  buttonLabel: string;
  buttonVariant?: "contained" | "outlined";
  showInfo?: boolean;
  dimmed?: boolean;
  masked?: boolean;
}) => (
  <Box
    sx={{
      bgcolor: "#fff",
      borderRadius: 1.5,
      p: 1.4,
      mb: 1.2,
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      opacity: dimmed ? 0.45 : 1,
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#1a1a2e" }}>{title}</Typography>
      {showInfo ? (
        <InfoOutlinedIcon sx={{ fontSize: 15, color: "#aaa" }} />
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
          <Typography sx={{ fontSize: 11, color: "#00b4ff", fontWeight: 600 }}>{subtitle}</Typography>
          <ChevronRightIcon sx={{ fontSize: 14, color: "#00b4ff" }} />
        </Box>
      )}
    </Box>

    {value && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
        {masked && <LockOutlinedIcon sx={{ fontSize: 13, color: "#888" }} />}
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>{value}</Typography>
      </Box>
    )}

    {description && (
      <Typography sx={{ fontSize: 11, color: "#777", mb: 0.6, lineHeight: 1.35 }}>{description}</Typography>
    )}

    {detail && (
      <Typography sx={{ fontSize: 11, color: "#777", mb: 0.8, lineHeight: 1.35 }}>{detail}</Typography>
    )}

    <Button
      fullWidth
      variant={buttonVariant}
      sx={{
        mt: 0.5,
        bgcolor: buttonVariant === "contained" ? "#00b4ff" : "transparent",
        borderColor: "#00b4ff",
        color: buttonVariant === "contained" ? "#fff" : "#00b4ff",
        fontWeight: 700,
        textTransform: "none",
        py: 0.6,
        fontSize: 12,
        borderRadius: 1,
        "&:hover": { bgcolor: buttonVariant === "contained" ? "#00a2e6" : "rgba(0,180,255,0.06)", borderColor: "#00b4ff" },
      }}
    >
      {buttonLabel}
    </Button>
  </Box>
);

export const SectionPreview = ({ data }: SectionPreviewProps) => {
  const name = data?.name || "Amazon";
  const preTitle = data?.preTitle || "Tá rolando Esquenta do";
  const title = data?.title || "Consumidor na Amazon!";
  const message = data?.message || "Separamos pra você as melhores ofertas antecipadas da Semana do Consumidor!";
  const buttonText = data?.buttonText || "Confira no GeruShop";
  const backgroundLink = data?.backgroundLink || "";
  const buttonType = data?.buttonType || "contained";

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        Pré-visualização da section
      </Typography>

      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          bgcolor: "#ececef",
          p: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: 328,
              height: 670,
              borderRadius: "42px",
              border: "10px solid #101a32",
              bgcolor: "#fff",
              overflow: "hidden",
              boxShadow: "0 18px 48px rgba(10, 17, 38, 0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* App header */}
            <Box sx={{ bgcolor: "#16060b", px: 2, pt: 1.3, pb: 1.8, color: "#fff" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.85 }}>
                <Typography sx={{ fontSize: 11 }}>3:09</Typography>
                <Typography sx={{ fontSize: 11 }}>◐ ▮</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1.1 }}>
                <Typography sx={{ fontSize: 38, lineHeight: 1, fontWeight: 800, color: "#00b4ff" }}>
                  GERU
                </Typography>
                <Box sx={{ display: "flex", gap: 1.2 }}>
                  <VisibilityOutlinedIcon sx={{ fontSize: 20, color: "rgba(255,255,255,0.95)" }} />
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 20, color: "rgba(255,255,255,0.95)" }} />
                </Box>
              </Box>
            </Box>

            {/* Scrollable content */}
            <Box sx={{ px: 1.5, py: 1.5, bgcolor: "#f2f2f5", flex: 1, overflowY: "auto" }}>

              {/* Quick actions */}
              <Typography sx={{ fontSize: 13, color: "#505468", fontWeight: 600, mb: 1.2 }}>
                Escolha o que fazer
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, mb: 1.8 }}>
                {[
                  { icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />, label: "Pagamentos\ndeste mês" },
                  { icon: <QrCode2OutlinedIcon sx={{ fontSize: 18 }} />, label: "Pagar com\nGeruPay" },
                  { icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} />, label: "Minhas\ntransações" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      border: "1px solid #7d84ff",
                      borderRadius: 1,
                      px: 0.7,
                      py: 0.8,
                      textAlign: "center",
                      color: "#5d63fb",
                      bgcolor: "#fff",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 0.4 }}>{item.icon}</Box>
                    <Typography sx={{ fontSize: 10.5, whiteSpace: "pre-line", lineHeight: 1.15, fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 1.5 }} />

              {/* Fake card — Crédito disponível (above current section, dimmed) */}
              <FakeCard
                title="Amazon"
                subtitle="Mais detalhes"
                value="R$ 500,00"
                description="Seu crédito expira em 30 dias"
                detail="Parcele suas compras na Amazon com o GeruPay. Simples e sem cartão de crédito!"
                buttonLabel="Comprar na Amazon"
                dimmed
              />

              {/* Fake card — Antecipação Saque FGTS (above current section, dimmed) */}
              <FakeCard
                title="Antecipação Saque FGTS"
                subtitle=""
                showInfo
                value="R$"
                masked
                description="Disponível para saque"
                detail="Consulte o valor disponível para antecipar seu Saque-aniversário do FGTS! Taxa de apenas 1,79% ao mês e sem pagamento mensal."
                buttonLabel="Simule agora"
                buttonVariant="outlined"
                dimmed
              />

              {/* ── Current section being edited ── */}

              <Box
                sx={{
                  position: "relative",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  minHeight: 200,
                  backgroundColor: "#0f0f12",
                  backgroundImage: backgroundLink ? `url(${backgroundLink})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  mb: 1.2,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.52) 58%, rgba(0,0,0,0.15) 100%)",
                  }}
                />
                <Box sx={{ position: "absolute", left: 14, right: 14, bottom: 14, color: "#fff" }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 300, lineHeight: 1.1, whiteSpace: "pre-line", mb: 0.3 }}>
                    {preTitle}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, fontWeight: 500, lineHeight: 1.1, whiteSpace: "pre-line", color: "#00b4ff", mb: 0.8 }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, lineHeight: 1.3, color: "rgba(255,255,255,0.92)", mb: 1, whiteSpace: "pre-line" }}
                  >
                    {message}
                  </Typography>
                  <Button
                    fullWidth
                    variant={buttonType === "outlined" ? "outlined" : "contained"}
                    sx={{
                      borderColor: "#fff",
                      color: buttonType === "outlined" ? "#fff" : undefined,
                      bgcolor: buttonType === "contained" ? "#00b4ff" : "transparent",
                      fontWeight: 700,
                      textTransform: "none",
                      py: 0.6,
                      fontSize: 13,
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: buttonType === "contained" ? "#00a2e6" : "rgba(255,255,255,0.08)",
                        borderColor: "#fff",
                      },
                    }}
                  >
                    {buttonText}
                  </Button>
                </Box>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
