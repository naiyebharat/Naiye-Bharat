import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/dbConnect";
import ChatRoom from "@/utils/models/ChatRoom";
import Message from "@/utils/models/Message";
import Order from "@/utils/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // 1. Fetch all ChatRooms
    const rooms = await ChatRoom.find({}).sort({ updatedAt: -1 }).lean();

    if (!rooms || rooms.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    const enriched: any[] = [];

    for (const room of rooms as any[]) {
      // 2. Check order payment status — SKIP if not paid/verified
      const order = await Order.findById(room.orderId).lean() as any;

      if (!order || !order.isVerified) {
        // Unpaid / spam order — skip entirely
        continue;
      }

      // 3. Get last message preview
      const lastMsg = await Message.findOne({ roomId: room._id })
        .sort({ createdAt: -1 })
        .lean() as any;

      // 4. 🔥 ASLI NAME NIKALNE KI LOGIC (Dummy Data Fix)
      // Agar order schema mein clientName hai toh wo, nahi toh name property, nahi toh fallback
      const realClientName = order.clientName || order.name || room.clientId || "Anonymous Client";

      enriched.push({
        id: room._id.toString(),
        roomId: room._id.toString(),
        clientId: room.clientId || "Unknown",
        name: realClientName, // 🔥 Ab UI mein dummy ki jagah ye real name pass hoga!
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

// PATCH endpoint ko chhedne ki zaroorat nahi hai, wo same rahega...
export async function PATCH(req: NextRequest) {
  // ... (Tumhara purana patch code)
}