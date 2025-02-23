import axios from "axios";

export async function POST(req: Request) {
  try {
    return Response.json({ message: "Ok" });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return Response.json({ err }, { status: err.status });
    }

    throw err;
  }
}
