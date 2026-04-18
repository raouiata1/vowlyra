const CRISP_WEBSITE_ID = "13d9d527-448d-4c25-bb2d-ce315a673134";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $crisp: any[][];
    CRISP_WEBSITE_ID: string;
  }
}

/** True once we've injected the <script> tag. */
let initialized = false;

/**
 * Lazily injects the Crisp script.
 * Safe to call multiple times — only runs once.
 * The chat launcher is hidden immediately so it never flickers in.
 */
export function loadCrisp(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.$crisp = [];
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

  // Hide the Crisp launcher — we show it only on explicit handoff
  window.$crisp.push(["do", "chat:hide"]);

  const script = document.createElement("script");
  script.src = "https://client.crisp.chat/l.js";
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Hands the conversation over to Crisp.
 * Sends the user's first message, then shows and opens the Crisp widget.
 * Optionally identifies the user by email / nickname.
 */
export function crispHandoff(
  userMessage: string,
  opts?: { email?: string; name?: string }
): void {
  // Always ensure Crisp is initialised before pushing commands
  if (!initialized) loadCrisp();

  const c = window.$crisp;

  // Identify the user when data is available
  if (opts?.email) c.push(["set", "user:email", [opts.email]]);
  if (opts?.name) c.push(["set", "user:nickname", [opts.name]]);

  // Deliver the message, then surface the widget
  c.push(["do", "message:send", ["text", userMessage]]);
  c.push(["do", "chat:show"]);
  c.push(["do", "chat:open"]);
}
