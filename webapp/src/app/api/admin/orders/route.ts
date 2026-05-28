import { NextResponse } from "next/server";
import { connectDB } from "@/utils/dbConnect"; 
import Order from "@/utils/models/Order";
import Advocate from "@/utils/models/advocate"; // Populate karne ke liye model register hona zaroori hai

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // Latest paid ya created orders nikalenge aur expert detail join karenge
    const orders = await Order.find({})
      .populate({
        path: "expertId",
        select: "name avatar specialty", // Sirf zaroori fields nikalenge advocate se
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    console.error("Error fetching admin ledger:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Ledger Failure" },
      { status: 500 }
    );
  }
}