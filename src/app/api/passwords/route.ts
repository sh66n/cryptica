import { NextRequest, NextResponse } from "next/server";
import { IPassword, Password, zPassword } from "@/models/password.model";
import { connectToDb } from "@/lib/connection";
import { auth } from "@/auth";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDb();
    console.log("in");
    console.log("Request URL:", req.url);
    console.log("Request headers:", Object.fromEntries(req.headers));
    const session = await auth();
    console.log("Session data:", session);
    console.log("Session data:", session);

    if (!session) {
      console.log("no sess");
      return NextResponse.json(
        {
          message: "Not authorized",
        },
        { status: 401 }
      );
    }

    let passwords: IPassword[];
    const tag = new URL(req.url).searchParams.get("tags");
    const query = new URL(req.url).searchParams.get("query");
    if (query && tag) {
      passwords = await Password.find({
        tags: tag,
        service_name: query,
        user_id: session.user._id,
      });
    } else if (tag && (tag === "work" || tag === "personal")) {
      passwords = await Password.find({
        tags: tag,
        user_id: session.user._id,
      });
    } else if (query) {
      passwords = await Password.find({
        service_name: query,
        user_id: session.user._id,
      });
    } else {
      passwords = await Password.find({ user_id: session.user._id });
    }
    return NextResponse.json(passwords, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDb();
    const session = await auth();
    console.log(session);
    if (!session) {
      return NextResponse.json(
        {
          message: "Not authorized",
        },
        { status: 401 }
      );
    }
    let body: IPassword = await req.json();
    body.user_id = session.user._id;
    zPassword.parse(body);
    const newPassword = await Password.create(body);
    return NextResponse.json(newPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
