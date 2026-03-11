"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/api/firebase";
import type { Link } from "@/domains/link";

function detectPlatform(): "ios" | "android" | "web" {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "web";
}

function resolveUrl(link: Link, platform: "ios" | "android" | "web"): string {
  if (platform === "ios") return link.appUrl || link.appStore || link.webUrl;
  if (platform === "android") return link.appUrl || link.playStore || link.webUrl;
  return link.webUrl;
}

export default function OneLinkPage() {
  const { slug } = useParams<{ slug: string }>();
  const [status, setStatus] = useState<"loading" | "not-found" | "error">("loading");

  useEffect(() => {
    if (!slug) return;

    async function resolve() {
      try {
        const q = query(
          collection(db, "links"),
          where("slug", "==", slug),
          where("active", "==", true)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setStatus("not-found");
          return;
        }

        const doc = snapshot.docs[0];
        const link = { id: doc.id, ...doc.data() } as Link;
        const platform = detectPlatform();
        const targetUrl = resolveUrl(link, platform);

        // Registra o clique (fire-and-forget)
        addDoc(collection(db, "links", link.id, "clicks"), {
          platform,
          userAgent: navigator.userAgent,
          createdAt: new Date(),
        });

        window.location.href = targetUrl;
      } catch {
        setStatus("error");
      }
    }

    resolve();
  }, [slug]);

  if (status === "not-found") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Link não encontrado.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Erro ao carregar o link.</p>
      </div>
    );
  }

  // loading
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Redirecionando...</p>
    </div>
  );
}
