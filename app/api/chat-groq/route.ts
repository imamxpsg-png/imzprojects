import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // PERBAIKAN 1: Menggunakan URL Endpoint API Groq yang benar
    const response = await fetch("https://groq.com", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // PERBAIKAN 2: Menggunakan nama model Groq Llama 3 yang valid dan super cepat
        model: "openai/gpt-oss-20b", 
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    
    // Memastikan data choices ada sebelum membaca konten teks
    if (data && data.choices && data.choices[0]) {
      const reply = data.choices[0].message.content;
      return NextResponse.json({ reply });
    } else {
      return NextResponse.json({ reply: "Maaf, Groq Cloud API mengembalikan respons kosong atau kuota habis." });
    }

  } catch (error) {
    console.error("Groq Bridge Error:", error);
    return NextResponse.json({ error: "Terjadi masalah pada server API" }, { status: 500 });
  }
}
