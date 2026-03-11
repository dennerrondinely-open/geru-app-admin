import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { firestoreQuery, firestoreAdd } from "@/lib/firebase-rest";
import type { Link } from "@/domains/link";

export const dynamic = "force-dynamic";

function detectPlatform(userAgent: string): "ios" | "android" | "web" {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "web";
}

function resolveUrl(link: Link, platform: "ios" | "android" | "web"): string {
  if (platform === "ios") return link.appUrl || link.appStore || link.webUrl;
  if (platform === "android") return link.appUrl || link.playStore || link.webUrl;
  return link.webUrl;
}

export default async function OneLinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";

  const results = await firestoreQuery<Link>("links", [
    { field: "slug", op: "EQUAL", value: slug },
    { field: "active", op: "EQUAL", value: true },
  ]);

  if (results.length === 0) {
    redirect("/");
  }

  const link = results[0];
  const platform = detectPlatform(userAgent);
  const targetUrl = resolveUrl(link, platform);

  // Registra o clique (fire-and-forget)
  firestoreAdd(`links/${link.id}/clicks`, {
    platform,
    userAgent,
    createdAt: new Date(),
  });

  redirect(targetUrl);
}
