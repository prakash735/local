import { NextResponse } from "next/server";
import postModel from "@/app/module/user";
import connectdb from "@/app/database/mongodb";
async function getPosts(_id) {
  try {
    await connectdb();
    let data;

    if (!_id) {
      data = JSON.parse(JSON.stringify(await postModel.find()));
    } else {
      data = await postModel.find({ message: _id }).sort({ date: 'desc' }).lean();
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw error;
  }
}

export const GET = async (req, res) => {
  const _id = req.nextUrl.searchParams.get('_id'); 
  console.log("GET REQUEST");
  try {
    const data = await getPosts(_id); 
    if (data && data.length > 0) {
      return NextResponse.json({ message: "Data fetched successfully", data }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error(error);
  }
};

export const POST = async (req, res) => {
  console.log("POST REQUEST");

  try {
    const dataReceived = await req.json();
    console.log(dataReceived);

    await connectdb();
    const post = await postModel.create(dataReceived);

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
};
