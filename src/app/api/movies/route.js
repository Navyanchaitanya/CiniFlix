import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre");
    const search = searchParams.get("search");
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "20");

    const where = {};

    if (genre) {
      where.genre = {
        has: genre,
      };
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const movies = await prisma.movie.findMany({
      where,
      skip,
      take,
      orderBy: {
        releaseDate: "desc",
      },
    });

    const total = await prisma.movie.count({ where });

    return NextResponse.json({
      success: true,
      data: movies,
      pagination: {
        total,
        skip,
        take,
      },
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
