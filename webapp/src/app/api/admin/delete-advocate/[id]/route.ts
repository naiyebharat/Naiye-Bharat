import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/dbConnect';
import Advocate from '@/utils/models/advocate';

export async function DELETE(
  request: Request,
  { params }: { params: any } // Next.js version compatibility ke liye 'any' rakha hai
) {
  try {
    await connectDB();

    // 🚀 FIX: params ko await karna zaroori hai Next.js 15+ mein
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Debugging ke liye server terminal mein print karega
    console.log("Wiping out Expert with ID:", id);

    // Agar Frontend se id missing ho ya 'undefined' string aaye
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { error: "Error: No Expert ID found." }, 
        { status: 400 }
      );
    }

    // Database deletion logic
    const deletedAdvocate = await Advocate.findByIdAndDelete(id);

    if (!deletedAdvocate) {
      return NextResponse.json(
        { error: "Error: No expert found." }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Expert profile successfully wiped out by admin! 🗑️" 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Admin Delete API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error: Record is not deleted." }, 
      { status: 500 }
    );
  }
}