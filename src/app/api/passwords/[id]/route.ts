import { Password } from "@/models/password.model";
import { NextResponse } from "next/server";

export const DELETE = async ({
  params,
}: {
  params: string;
}): Promise<NextResponse> => {
  const id = await params;
  const deletedPassword = await Password.findByIdAndDelete(id, { new: true });
  return NextResponse.json(
    {
      deletedPassword,
    },
    { status: 200 }
  );
};
