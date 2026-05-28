import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/dbConnect"; // 💡 Apne global dbConnect ko use karo conflicts se bachne ke liye
import Order from "@/utils/models/Order";
import ChatRoom from "@/utils/models/ChatRoom";
import Message from "@/utils/models/Message";
import "@/utils/models/advocate";

export async function GET() {
  try {
    await connectDB();

    // 1. Sirf verified paid orders nikalenge
    const orders = await Order.find({ isVerified: true })
      .populate("expertId", "name")
      .sort({ createdAt: -1 })
      .lean();

    const formattedCases = [];

    for (const order of orders as any[]) {
      // 2. Har order ke corresponding ChatRoom dhoondo (agar nahi hai toh fallback setup)
      let room = await ChatRoom.findOne({ orderId: order._id }).lean() as any;
      
      // Safety net: Agar room kisi wajah se create nahi hua, toh order ID fallback use karenge
      const targetRoomId = room ? room._id.toString() : order._id.toString();

      // 3. Real-time message snippet pull engine
      let snippet = "No connection payloads established yet.";
      let finalTimestamp = order.createdAt;

      if (room) {
        const lastMsg = await Message.findOne({ roomId: room._id })
          .sort({ createdAt: -1 })
          .lean() as any;

        if (lastMsg) {
          snippet = lastMsg.text.length > 45 ? `${lastMsg.text.substring(0, 45)}...` : lastMsg.text;
          finalTimestamp = lastMsg.createdAt;
        } else if (order.issueDescription) {
          snippet = order.issueDescription.length > 45 ? `${order.issueDescription.substring(0, 45)}...` : order.issueDescription;
        }
      } else if (order.issueDescription) {
        snippet = order.issueDescription.length > 45 ? `${order.issueDescription.substring(0, 45)}...` : order.issueDescription;
      }

      // Sync custom model state definitions with UI layouts
      let mappedStatus: "ACTIVE" | "PENDING" | "COMPLETED" = "PENDING";
      if (room?.status === "active_discussion" || order.status === "paid") mappedStatus = "ACTIVE";
      if (room?.status === "closed") mappedStatus = "COMPLETED";

      formattedCases.push({
        id: targetRoomId, // 🔥 CHAT WAALE ROOM ID KO INJECT KIYA (Polling isi par trigger hogi)
        advocateName: order.expertId?.name ? `Adv. ${order.expertId.name}` : "Unassigned Node",
        specialty: order.specialty || "Legal Consultation",
        lastMessageSnippet: snippet,
        status: mappedStatus,
        timestamp: new Date(finalTimestamp).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }).toLowerCase(),
        
        // Telemetry drawer payload maps
        clientName: order.clientName || "Anonymous Client",
        clientAge: order.clientAge || 0,
        email: order.email || "No Email Provided",
        phoneNumber: order.phoneNumber || "N/A",
        language: order.language || "English",
        sessionCost: order.sessionCost || order.amount || 0,
        razorpayOrderId: order.razorpayOrderId || "N/A",
        issueDescription: order.issueDescription || ""
      });
    }

    return NextResponse.json({ success: true, cases: formattedCases }, { status: 200 });
  } catch (error: any) {
    console.error("Pipeline fetch error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}