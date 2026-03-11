import { useEffect } from "react";
import { useParams } from "react-router";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useFirestoreDoc } from "api/hooks/useFirestoreDoc";
import type { Link } from "domains/link";

/**
 * Página pública de redirecionamento — replica exatamente a lógica do one_link_service.
 *
 * Rota: /go/:id
 *
 * Fluxo (espelho do redirect.ts + redirect.handlebars do serviço):
 *  1. Busca o Link pelo ID na coleção `links` do Firestore
 *  2. Se mobile iOS  → tenta abrir appUrl; após 2s redireciona para appStore
 *  3. Se mobile Android → tenta abrir appUrl; após 2s redireciona para playStore
 *  4. Se desktop → redirect direto para webUrl
 */
export const RedirectPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: link, loading } = useFirestoreDoc<Link>("links", id);

  useEffect(() => {
    if (loading) return;

    if (!link || !link.active) {
      window.location.replace("/not-found");
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);
    const isMobile = isIOS || isAndroid;

    if (!isMobile) {
      // Desktop: redirect direto para webUrl — igual ao `res.redirect(link.webUrl)` do serviço
      window.location.replace(link.webUrl);
      return;
    }

    // Mobile: tenta abrir o deep link do app primeiro
    // Se o app não abrir em 2s, redireciona para a loja — igual ao redirect.handlebars
    const store = isIOS ? link.appStore : link.playStore;

    window.location.replace(link.appUrl);

    const fallbackTimer = setTimeout(() => {
      window.location.replace(store);
    }, 2000);

    const clearFallback = () => clearTimeout(fallbackTimer);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearFallback();
    });
    window.addEventListener("blur", clearFallback);
  }, [link, loading]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0D0D0D",
        color: "#fff",
        gap: 3,
      }}
    >
      <CircularProgress sx={{ color: "#00D4FF" }} />
      <Typography
        variant="body1"
        sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
      >
        {loading ? "Carregando..." : `Abrindo ${link?.name ?? ""}...`}
      </Typography>
    </Box>
  );
};
