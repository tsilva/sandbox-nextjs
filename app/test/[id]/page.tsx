export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  const todo = await response.json();
  const todos = [todo];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Test Page</h1>
      {todos.map((todo, index) => {
        return <div className="space-y-2" key={index}>
          <p className="text-xl">
            ID: <span className="font-semibold">{todo.id}</span>
          </p>
          <p className="text-xl">
            UserId: <span className="font-semibold">{todo.userId}</span>
          </p>
          <p className="text-xl">
            Title: <span className="font-semibold">{todo.title}</span>
          </p>
          <p className="text-xl">
            Completed: <span className="font-semibold">{todo.completed ? `true` : `false`}</span>
          </p>
        </div>;
      })}
    </div>
  );
}
