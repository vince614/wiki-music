import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const user = await prisma.user.upsert({
      where: {
        identifier: data.identifier,
      },
      update: {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        provider: data.provider,
        refreshToken: data.refreshToken,
      },
      create: { ...data },
    });

    return NextResponse.json({
      user: user,
      code: 201,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error upserting user",
      code: 500,
    });
  }
}
