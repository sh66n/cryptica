import { NextRequest, NextResponse } from "next/server";
import { IPassword, Password, zPassword } from "@/models/password.model";
import { connectToDb } from "@/lib/connection";

export const GET = async (): Promise<NextResponse> => {
  try {
    await connectToDb();
    const passwords: IPassword[] = await Password.find({});
    return NextResponse.json(passwords, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDb();
    let body: IPassword = await req.json();
    zPassword.parse(body);
    const newPassword = await Password.create(body);
    return NextResponse.json(newPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
