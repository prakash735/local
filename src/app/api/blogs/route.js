import { NextResponse } from "next/server";
import postModel from "@/app/module/user";
import connectdb from "@/app/database/mongodb"; // use cached connection

// Function to fetch posts
async function getPosts(_id) {
  try {
    await connectdb(); // ensure DB is connected

    let data;
    if (!_id) {
      data = JSON.parse(JSON.stringify(await postModel.find()));
    } else {
      data = await postModel.find({ message: _id }).sort({ date: -1 }).lean();
    }

    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error;
  }
}

// GET method
export const GET = async (req) => {
  const _id = req.nextUrl.searchParams.get("_id"); 
  console.log("GET REQUEST");

  try {
    const data = await getPosts(_id);

    if (data && data.length > 0) {
      return NextResponse.json({ message: "Data fetched successfully", data }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};

// POST method
export const POST = async (req) => {
  console.log("POST REQUEST");

  try {
    const dataReceived = await req.json();
    console.log("Data received:", dataReceived);

    await connectdb(); // ensure DB is connected
    const post = await postModel.create(dataReceived);

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
};
