const IS_DEV = process.env.NODE_ENV === "development";

export const Logger = {
  request: (method: string, endpoint: string, headers: any, payload?: any) => {
    if (!IS_DEV) return;

    console.log(` [ API REQUEST] [${method}] ${endpoint}`);
    console.dir(
      {
        headers: sanitizeHeaders(headers),
        payload,
      },
      { depth: null },
    );
  },

  response: (method: string, endpoint: string, status: number, data: any) => {
    if (!IS_DEV) return;

    const icon = status >= 200 && status < 300 ? "[Success]" : "[Failed]";
    console.log(`${icon}: [ API RESPONSE] [${status}] [${method}] ${endpoint}`);
    if (data) console.dir(data, { depth: null });
  },

  info: (message: string, detail?: any) => {
    if (!IS_DEV) return;
    console.log(` [ INFO] ${message}`, detail ?? "");
  },
};

function sanitizeHeaders(headers: Record<string, string>) {
  const sensitive = ["authorization", "x-internal-api-key"];
  const clean = { ...headers };
  for (const key in clean) {
    if (sensitive.includes(key.toLowerCase())) clean[key] = "[REDACTED]";
  }
  return clean;
}
