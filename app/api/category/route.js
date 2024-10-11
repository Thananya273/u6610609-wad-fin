import connectDB from "@/lib/db"; // Adjust the path as needed
import Category from "@/models/Category";

// Connect to the database before handling the request
await connectDB();

export async function GET() {
    const categories = await Category.find().sort({ order: -1 });
    return Response.json(categories);
}

export async function POST(request) {
    const body = await request.json();
    const category = new Category(body);
    await category.save();
    return Response.json(category);
}

export async function PUT(request) {
    const body = await request.json();
    const category = await Category.findByIdAndUpdate(body._id, body);
    return Response.json(category);
}

export async function DELETE(request, { params }) {
    const id = params.id;
    const category = await Category.findByIdAndDelete(id);
    return Response.json(category);
}
