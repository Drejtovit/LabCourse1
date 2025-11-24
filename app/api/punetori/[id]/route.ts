import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type Params = { params: {id: String} };

//delete -> delete punetori
export async function DELETE(request, { params }: Params) {
    const id = Number(params.id);   

    try {
        await prisma.punetori.delete({ where: { id } });
        return NextResponse.json({ success: true});
    } catch {
        return NextResponse.json(
            { error: 'Punetori nuk u gjet.'}, 
            { status: 404 }
        );
    }
}