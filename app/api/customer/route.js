import Customer from "@/models/Customer"; 

export async function GET() {
  const customers = await Customer.find().sort({ order: -1 }); 
  return Response.json(customers);
}

export async function POST(request) {
  const body = await request.json();
  const customer = new Customer(body); 
  await customer.save(); 
  return Response.json(customer);
}


