/**
 * Firestore REST API client — server-side only
 * Usa apenas NEXT_PUBLIC_FIREBASE_* (sem service account)
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

type FirestoreValue =
  | { stringValue: string }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { timestampValue: string }
  | { mapValue: { fields: Record<string, FirestoreValue> } }
  | { nullValue: null };

type FirestoreDocument = {
  name: string;
  fields: Record<string, FirestoreValue>;
  createTime?: string;
  updateTime?: string;
};

type RunQueryResponse = Array<{ document?: FirestoreDocument }>;

function unwrapValue(value: FirestoreValue): unknown {
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return parseInt(value.integerValue, 10);
  if ("timestampValue" in value) return new Date(value.timestampValue);
  if ("mapValue" in value) return unwrapFields(value.mapValue.fields);
  if ("nullValue" in value) return null;
  return null;
}

function unwrapFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, unwrapValue(v)])
  );
}

function docId(name: string): string {
  return name.split("/").pop()!;
}

/**
 * Busca documentos com filtros usando runQuery (structured query)
 */
export async function firestoreQuery<T>(
  collection: string,
  filters: Array<{ field: string; op: string; value: string | boolean | number }>
): Promise<Array<T & { id: string }>> {
  const url = `${BASE_URL}:runQuery?key=${API_KEY}`;

  const fieldFilters = filters.map((f) => ({
    fieldFilter: {
      field: { fieldPath: f.field },
      op: f.op,
      value:
        typeof f.value === "string"
          ? { stringValue: f.value }
          : typeof f.value === "boolean"
          ? { booleanValue: f.value }
          : { integerValue: String(f.value) },
    },
  }));

  const body = {
    structuredQuery: {
      from: [{ collectionId: collection }],
      where:
        fieldFilters.length === 1
          ? fieldFilters[0]
          : {
              compositeFilter: {
                op: "AND",
                filters: fieldFilters,
              },
            },
      limit: 1,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firestore runQuery error: ${err}`);
  }

  const data: RunQueryResponse = await res.json();

  return data
    .filter((item) => !!item.document)
    .map((item) => {
      const doc = item.document!;
      return {
        id: docId(doc.name),
        ...(unwrapFields(doc.fields) as T),
      } as T & { id: string };
    });
}

/**
 * Adiciona um documento a uma sub-coleção
 */
export async function firestoreAdd(
  path: string,
  data: Record<string, unknown>
): Promise<void> {
  const url = `${BASE_URL}/${path}?key=${API_KEY}`;

  function wrapValue(v: unknown): FirestoreValue {
    if (typeof v === "string") return { stringValue: v };
    if (typeof v === "boolean") return { booleanValue: v };
    if (typeof v === "number") return { integerValue: String(v) };
    if (v instanceof Date) return { timestampValue: v.toISOString() };
    if (v === null || v === undefined) return { nullValue: null };
    return { stringValue: String(v) };
  }

  const fields: Record<string, FirestoreValue> = {};
  for (const [k, val] of Object.entries(data)) {
    fields[k] = wrapValue(val);
  }

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
    cache: "no-store",
  });
}
