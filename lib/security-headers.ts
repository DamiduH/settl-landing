export function securityHeaders(development: boolean) {
  // Next's cached static shell uses inline bootstrap scripts. Nonces would require
  // changing the rendering strategy, so this policy retains inline scripts/styles.
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${development ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "form-action 'self'",
    ...(!development ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
  return [
    { key: "Content-Security-Policy", value: csp },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    ...(!development ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
  ];
}
