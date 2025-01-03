import { NextRequest, NextResponse } from "next/server";
import { IPassword, Password, zPassword } from "@/models/password.model";
import { connectToDb } from "@/lib/connection";
import { auth } from "@/auth";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDb();
    let passwords: IPassword[];
    const tag = new URL(req.url).searchParams.get("tags");
    const query = new URL(req.url).searchParams.get("query");
    console.log(query);
    if (query && tag) {
      passwords = await Password.find({
        tags: tag,
        service_name: query,
      });
    } else if (tag && (tag === "work" || tag === "personal")) {
      passwords = await Password.find({
        tags: tag,
      });
    } else if (query) {
      console.log("running");
      passwords = await Password.find({
        service_name: query,
      });
    } else {
      passwords = await Password.find({});
    }
    return NextResponse.json(passwords, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDb();
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          message: "Not authorized",
        },
        { status: 401 }
      );
    }
    let body: IPassword = await req.json();
    console.log(session);
    body.user_id = session.user._id;
    zPassword.parse(body);
    const newPassword = await Password.create(body);
    return NextResponse.json(newPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
