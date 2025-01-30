export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  //const { searchParams } = new URL(request.url);
  const slug = null;//searchParams.get("slug");
  const id = (await params).id;
  const timestamp = new Date().toISOString();
  const message = `/api/hello/${id}`;
  return Response.json({ id, message, slug, timestamp });
}
