import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/dbConnect'; 
import Advocate from '@/utils/models/advocate'; 

export async function POST(request: Request) {
  try {
    // Database Connection initialize karein
    await connectDB();

    // Parse payload incoming data parameters
    const body = await request.json();
    const { name, age, specialty, language, pricing, videoUrl, email, phoneNumber, qualification, practiceYears, avatar } = body;

    // Strict Server-Side Validation (Naye fields ke sath)
    if (!name || !age || !specialty || !pricing || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Validation Failed: Missing required credentials (Name, Age, Email, Phone, Domain, Fee)." }, 
        { status: 400 }
      );
    }

    const parsedAge = Number(age);
    const parsedPricing = Number(pricing);
    const parsedYears = practiceYears ? Number(practiceYears) : 5;

    if (isNaN(parsedAge) || isNaN(parsedPricing)) {
      return NextResponse.json(
        { error: "Validation Failed: Age and Pricing must be valid numbers." }, 
        { status: 400 }
      );
    }

    // Create document entry inside MongoDB Atlas
    const newAdvocate = await Advocate.create({
      name,
      age: parsedAge,
      specialty,
      language: Array.isArray(language) ? language : [language],
      pricing: parsedPricing,
      videoUrl: videoUrl || '',
      qualification: qualification || 'Verified Practitioner',
      practiceYears: isNaN(parsedYears) ? 5 : parsedYears,
      avatar: avatar || '',
      email: email.toLowerCase().trim(), 
      phoneNumber: phoneNumber,    
      isAvailable: true 
    });

    // 5. Success Response
    return NextResponse.json({ 
      success: true, 
      message: "Advocate with secure credentials successfully registered! 🎉", 
      data: newAdvocate 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Database Transaction Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Production Server Error. Data synchronization failed." }, 
      { status: 500 }
    );
  }
}

// This api is returning all the experts from database
export async function GET() {
  try {
    // Database connection check
    await connectDB();

    // Latest experts ko sabse upar dikhane ke liye sort({ createdAt: -1 }) lagaya hai
    const advocates = await Advocate.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(advocates, { status: 200 });
  } catch (error: any) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { error: "Database se experts fetch karne mein error aaya." }, 
      { status: 500 }
    );
  }
}