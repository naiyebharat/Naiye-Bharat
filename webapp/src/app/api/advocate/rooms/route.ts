import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/utils/dbConnect";
import ChatRoom from "@/utils/models/ChatRoom";
import Message from "@/utils/models/Message";
import Order from "@/utils/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch all ChatRooms
    const rooms = await ChatRoom.find({}).sort({ updatedAt: -1 }).lean();

    if (!rooms || rooms.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Enrich each room — ONLY include rooms with a VERIFIED (paid) order
    const enriched: any[] = [];

    for (const room of rooms as any[]) {
      // Check order payment status — SKIP if not paid
      const order = await Order.findById(room.orderId).lean() as any;

      if (!order || !order.isVerified) {
        // Unpaid / spam order — skip entirely
        continue;
      }

      // Get last message preview
      const lastMsg = await Message.findOne({ roomId: room._id })
        .sort({ createdAt: -1 })
        .lean() as any;

      enriched.push({
        id: room._id.toString(),
        roomId: room._id.toString(),
        clientId: room.clientId || "Unknown",
        name: order.name || room.clientId || "Anonymous Client",
        issue: order.issueDescription || order.legalArea || "Legal Consultation",
        status: room.status || "pending_expert",
        isAssigned: room.isAssigned,
        lastMessage: lastMsg?.text || "Session started.",
        lastMessageTime: lastMsg?.createdAt
          ? new Date(lastMsg.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
          : new Date(room.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        createdAt: room.createdAt,
      });
    }

    return NextResponse.json({ success: true, data: enriched });
  } catch (err: any) {
    console.error("Advocate rooms fetch error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH — update room status
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { roomId, status } = await req.json();

    if (!roomId || !status) {
      return NextResponse.json({ success: false, error: "roomId and status required" }, { status: 400 });
    }

    const validStatuses = ["pending_expert", "active_discussion", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status value" }, { status: 400 });
    }

    const updated = await ChatRoom.findByIdAndUpdate(
      roomId,
      { status, isAssigned: status === "active_discussion" },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("Room status update error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
