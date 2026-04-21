import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const watchlist = await prisma.watchlistItem.findMany({
      where: { userId: user.id },
      include: {
        movie: true,
      },
      orderBy: {
        addedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: watchlist,
    });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { movieId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const existingItem = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: user.id,
          movieId,
        },
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { success: false, error: "Already in watchlist" },
        { status: 400 }
      );
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: user.id,
        movieId,
      },
      include: {
        movie: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: watchlistItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
