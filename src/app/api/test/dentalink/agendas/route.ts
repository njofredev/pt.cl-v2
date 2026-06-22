import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fecha = searchParams.get("fecha") || new Date().toISOString().split("T")[0];
  const id_profesional = searchParams.get("id_profesional");
  const id_sucursal = searchParams.get("id_sucursal") || "1";
  const duracion = searchParams.get("duracion") || "15";

  const token = process.env.DENTALINK_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "El token de la API de Dentalink no está configurado en las variables de entorno." },
      { status: 500 }
    );
  }

  // Construct search params in Dentalink's q format:
  // q={"id_sucursal":{"eq":1},"fecha":{"eq":"2022-01-08"},"duracion":{"eq":15}}
  const qParams: any = {
    id_sucursal: { eq: parseInt(id_sucursal, 10) },
    fecha: { eq: fecha },
    duracion: { eq: parseInt(duracion, 10) }
  };

  if (id_profesional && id_profesional !== "null" && id_profesional !== "undefined") {
    qParams.id_profesional = { eq: parseInt(id_profesional, 10) };
  }

  const url = new URL("https://api.dentalink.healthatom.com/api/v5/agendas");
  url.searchParams.set("q", JSON.stringify(qParams));

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": token,
        "Accept": "application/json"
      },
      next: { revalidate: 0 } // Disable caching to fetch real-time slots
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Dentalink API respondió con error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al realizar la consulta a Dentalink", details: error.message },
      { status: 500 }
    );
  }
}
