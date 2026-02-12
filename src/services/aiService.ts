export async function generateContent(
  topic: string,
  contentType: string,
  tone: string
) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, contentType, tone }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Request failed");

  return data.text as string;
}
