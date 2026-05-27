import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/dbConnect";
import Advocate from "@/utils/models/advocate";
import ClientOrder from "@/utils/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID context parameter missing." },
        { status: 400 },
      );
    }

    // 1. Client ka current criteria packet fetch karo
    const currentOrder = await ClientOrder.findById(orderId);
    if (!currentOrder) {
      return NextResponse.json(
        { error: "Active intake order packet not found." },
        { status: 404 },
      );
    }

    // 2. Initial strict query (Case insensitive)
    let queryFilter: any = {
      isAvailable: true,
      specialty: { $regex: new RegExp(`^${currentOrder.specialty}$`, "i") },
      language: { $regex: new RegExp(`^${currentOrder.language}$`, "i") },
    };

    let matchedAdvocates = await Advocate.find(queryFilter);

    // 3. Agar direct match nahi mila, toh thoda flexible (regex) search try karte hain
    if (matchedAdvocates.length === 0) {
      // e.g. "Mental Health / Therapy" me se "Mental Health" nikalne ke liye
      const specialtyKeyword = currentOrder.specialty.split("/")[0].trim();

      queryFilter = {
        isAvailable: true,
        specialty: { $regex: new RegExp(specialtyKeyword, "i") }, // Contains keyword
        language: { $regex: new RegExp(currentOrder.language, "i") }, // Contains language
      };
      matchedAdvocates = await Advocate.find(queryFilter);
    }

    // 4. Agar fir bhi nahi mila, toh let's just match language as a fallback
    if (matchedAdvocates.length === 0) {
      queryFilter = {
        isAvailable: true,
        language: { $regex: new RegExp(currentOrder.language, "i") },
      };
      matchedAdvocates = await Advocate.find(queryFilter);
    }

    return NextResponse.json(
      {
        success: true,
        data: matchedAdvocates,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Advocate Matcher API Crash:", error);
    return NextResponse.json(
      { error: "Internal lookup pipeline error." },
      { status: 500 },
    );
  }
}
