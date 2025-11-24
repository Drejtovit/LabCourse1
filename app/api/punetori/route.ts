import { NextResponse } from "next/server"; 
import prisma from "@/lib/db";

//post -> add punetori
export async function POST(request) {
    const body = await request.json();
    const {emri, mbiemri, pozita, fabrikaId} = body;

    if (!emri || !mbiemri || !pozita || !fabrikaId) {
        return NextResponse.json(
            { error: 'Te gjitha fushat jane te detyrueshme.' },
            { status: 400 }
        );
    }

    const punetori = await prisma.punetori.create({
        data: {emri, mbiemri, pozita, fabrikaId: Number(fabrikaId)},
    });

    return NextResponse.json(punetori, { status: 201 });
}