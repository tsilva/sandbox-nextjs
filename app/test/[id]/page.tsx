type ApiResponse = {
  id: string;
  timestamp: string;
  message: string;
}

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const response = await fetch(`http://localhost:3000/api/hello/${id}`);
  const data: ApiResponse = await response.json();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Test Page</h1>
      <div className="space-y-2">
        <p className="text-xl">ID: <span className="font-semibold">{data.id}</span></p>
        <p className="text-xl">Message: <span className="font-semibold">{data.message}</span></p>
        <p className="text-xl">Timestamp: <span className="font-semibold">{data.timestamp}</span></p>
      </div>
    </div>
  );
}
