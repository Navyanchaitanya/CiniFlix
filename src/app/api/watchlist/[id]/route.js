import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id },
    });

    if (!watchlistItem || watchlistItem.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    await prisma.watchlistItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Removed from watchlist",
    });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { progress, completed } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id },
    });

    if (!watchlistItem || watchlistItem.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.watchlistItem.update({
      where: { id },
      data: {
        ...(progress !== undefined && { progress }),
        ...(completed !== undefined && { completed }),
      },
      include: {
        movie: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating watchlist:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
