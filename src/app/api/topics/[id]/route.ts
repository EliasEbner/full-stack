import { NextResponse, NextRequest } from 'next/server';
import Topic from '@/models/topic';
import connectMongoDB from '@/libs/mongodb';

export async function PUT(request: NextRequest, params: {id: string, newTitle: string, newDescription: string }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, {title, description});
  return NextResponse.json({message: "topic updated"}, {status:200});
}

export async function GET(request: NextRequest, params: {id: string}) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({_id: id});
  return NextResponse.json({topic}, {status: 200})
}
