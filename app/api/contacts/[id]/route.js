import prisma from "@/lib/db.js";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const contactId = Number(id);
    if (Number.isNaN(contactId)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(contact), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const contactId = Number(id);
    if (Number.isNaN(contactId)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = await request.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updated = await prisma.contact.update({
      where: { id: contactId },
      data: { name, email, subject, message },
    });
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "Contact not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Failed to update contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const contactId = Number(id);
    if (Number.isNaN(contactId)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    await prisma.contact.delete({ where: { id: contactId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting contact:", error);
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "Contact not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Failed to delete contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
