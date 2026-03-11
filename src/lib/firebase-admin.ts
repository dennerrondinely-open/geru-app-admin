import * as admin from "firebase-admin";

let initialized = false;

function initFirebase(): void {
  if (initialized) return;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error("Variável NEXT_PUBLIC_FIREBASE_PROJECT_ID não configurada.");
  }

  // Usa Application Default Credentials (ADC) em todos os ambientes:
  // - Local: requer `gcloud auth application-default login`
  // - Cloud Run (Firebase Hosting): usa a Service Account atribuída via IAM automaticamente
  // - GitHub Actions: usa google-github-actions/auth com credentials_json
  admin.initializeApp({ projectId });

  initialized = true;
}

export function getAdminDb(): admin.firestore.Firestore {
  initFirebase();
  return admin.firestore();
}
