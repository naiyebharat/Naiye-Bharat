import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/utils/dbConnect";
import Order from "@/utils/models/Order";
import ChatRoom from "@/utils/models/ChatRoom";
import Message from "@/utils/models/Message";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, localOrderId } = await req.json();

    // 1. Signature Verify Karo (Security Check)
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Signature mismatch, transaction invalid." }, { status: 400 });
    }

    // 2. Order Database Entry Update
    // isVerified = true → prevents TTL deletion
    // expireAt = undefined → MongoDB TTL index no longer targets this doc
    const order = await Order.findByIdAndUpdate(localOrderId, {
      $set: {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        isVerified: true,
      },
      $unset: { expireAt: "" }, // Remove TTL field — paid orders never expire
    }, { new: true });

    // Safety check — order must exist before creating ChatRoom
    if (!order) {
      return NextResponse.json({ success: false, error: "Order record not found in database." }, { status: 404 });
    }

    // 3. Dynamic Chat Room Stream Trigger Karo
    const newRoom = await ChatRoom.create({
      orderId: order._id,
      clientId: order.userId || "guest",
      expertId: order.expertId,
      status: "pending_expert",
    });

    // 4. Onboarding Chat Line Initialize Karo
    await Message.create({
      roomId: newRoom._id,
      senderType: "system",
      senderName: "NaiyeBharat Bot",
      text: "Aapka session token valid ho chuka hai. Hamare live expert panel ko message forward kar diya gaya hai. Kripya apna prashna niche type karein."
    });

    return NextResponse.json({ success: true, roomId: newRoom._id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}