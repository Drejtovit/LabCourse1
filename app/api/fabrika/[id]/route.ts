import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type Params = { params: {id: String} };

//get -> one fabrika
export async function GET(request, { params }: Params) {
    const id = Number(params.id);
    const fabrika = await prisma.fabrika.findUnique({
        where: {id},
        include: {punetoret: true},
    });

    if (!fabrika) {
        return NextResponse.json({ error: 'Fabrika nuk u gjet.'}, { status: 404 });
    }

    return NextResponse.json(fabrika);
}

//put -> update fabrika
export async function PUT(request, { params }: Params) {
    const id = Number(params.id);
    const {emriFabrikes, lokacioni} = await request.json();

    const updatedFabrika = await prisma.fabrika.update({
        where: {id},
        data: {emriFabrikes, lokacioni},
    });

    return NextResponse.json(updatedFabrika);
}