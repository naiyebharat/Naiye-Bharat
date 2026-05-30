import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Teeno possible cookies check karo aur jo mili wo clear karo
    const clientToken   = req.cookies.get("client_auth_token")?.value;
    const advocateToken = req.cookies.get("advocate_auth_token")?.value;
    const adminToken    = req.cookies.get("admin_auth_token")?.value;

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    // Jo cookie exist karti hai usse expire karo
    if (clientToken) {
      response.cookies.set({
        name: "client_auth_token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0, // ← turant expire
        path: "/",
      });
    }

    if (advocateToken) {
      response.cookies.set({
        name: "advocate_auth_token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });
    }

    if (adminToken) {
      response.cookies.set({
        name: "admin_auth_token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });
    }

    return response;

  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}