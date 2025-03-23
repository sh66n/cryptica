import { auth } from "@/auth";
import { connectToDb } from "@/lib/connection";
import { Password, zPassword } from "@/models/password.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: any
): Promise<NextResponse> => {
  try {
    const { id } = await params;
    const password = await Password.findById(id);
    return NextResponse.json(
      {
        success: password,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    console.log("in request");
    //check whether the user who has made the request is logged in
    const session = await auth();
    if (!session) {
      //if not return
      return NextResponse.json(
        {
          error: "Not authorized",
        },
        { status: 401 }
      );
    }
    console.log("user logged in");

    //check whether the user who has made the request is indeed the owner of that password
    const { id } = await params;
    console.log(id);
    await connectToDb();
    const password = await Password.findById(id);
    console.log(password.user_id.toString() === session.user?._id);
    if (password.user_id.toString() !== session.user?._id) {
      //if not return
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    console.log("user is the owner");

    //check whether the new password sent matches our schema
    const body = await req.json();
    console.log(body);
    zPassword.parse(body);

    //if it does, continue to make the changes specified by the user
    const editedPassword = await Password.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(
      {
        success: editedPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async ({
  params,
}: {
  params: { id: string };
}): Promise<NextResponse> => {
  const { id } = await params;
  const deletedPassword = await Password.findByIdAndDelete(id, { new: true });
  return NextResponse.json(
    {
      deletedPassword,
    },
    { status: 200 }
  );
};
