import { NextResponse } from "next/server";
import prisma from "@/lib/db";

//get -> all fabrika with their workers
export async function GET() {
    const fabrika = await prisma.fabrika.findMany({
        include: {
            workers: true,
        },
    });

    return NextResponse.json(fabrika);
}

//post -> create new fabrika
export async function POST(request) {
    const body = await request.json();
    const {emriFabrikes, lokacioni} = body;

    if (!emriFabrikes || !lokacioni) {
        return NextResponse.json(
            { error: 'Te gjitha fushat jane te detyrueshme.' },
            { status: 400 }
        );
    }
    
    const fabrika = await prisma.fabrika.create({
        data: {emriFabrikes, lokacioni},
    });

    return NextResponse.json(fabrika, { status: 201 }); 
}