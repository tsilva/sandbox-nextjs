export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Test Page</h1>
      <p className="text-xl">
        The ID parameter is: <span className="font-semibold">{id}</span>
      </p>
    </div>
  );
}
