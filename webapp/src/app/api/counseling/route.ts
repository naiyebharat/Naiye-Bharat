import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/dbConnect";
import ClientOrder from "@/utils/models/Order";

export async function POST(req: NextRequest) {
  try {
    // 1. Database Connect karo
    await connectDB();

    // 2. Request body se Formik ka data nikaalo
    const body = await req.json();
    const {
      clientName,
      clientAge,
      email,
      phoneNumber,
      specialty,
      language,
      issueDescription,
    } = body;

    // 3. Basic Validation Check (Backend Safety Node)
    if (
      !clientName ||
      !clientAge ||
      !email ||
      !phoneNumber ||
      !specialty ||
      !language ||
      !issueDescription
    ) {
      return NextResponse.json(
        { error: "Missing required onboarding telemetry fields." },
        { status: 400 },
      );
    }

    // 4. Mongoose Document Create karo (Initial state: expertId null aur status pending rahega)
    const newOrder = await ClientOrder.create({
      clientName,
      clientAge: Number(clientAge),
      email,
      phoneNumber,
      specialty,
      language,
      issueDescription,
      expertId: null,
      sessionCost: 0,
      paymentStatus: "pending",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    // 5. Client ko temporary Order ID response mein bhej do taaki step-2 par kaam aaye
    return NextResponse.json(
      {
        success: true,
        message: "Client intake packet generated successfully.",
        orderId: newOrder._id,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API Pipeline Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server crash at ingestion gateway." },
      { status: 500 },
    );
  }
}
