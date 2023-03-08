import { NextPage } from "next";
import { api } from "../../utils/api";
import { useRedirectWhenUnuth } from "../../hooks/useRedirectWhenUnauth";
const ShowTodos: NextPage = () => {
  const utils = api.useContext();
  const mutation = api.todosRouter.deleteTodo.useMutation({
    onError(error, variables, context) {
      console.log(`Error fired ${error.message}`);
    },
    onSuccess() {
      utils.todosRouter.getTodos.invalidate();
    },
  });

  function deleteTodo(id: string) {
    console.log("Fired 🔥");
    mutation.mutate({
      todoId: id,
    });
  }

  const { status } = useRedirectWhenUnuth("/");

  const { data, error, isLoading } = api.todosRouter.getTodos.useQuery();
  if (error) {
    console.log(error);
  }

  if (isLoading || status === "loading") {
    return <p>Is Loading!</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((todo) => {
                  return (
                    <tr className="border-b" key={todo.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {todo.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                        {todo.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                        {todo.description}
                      </td>
                      <td
                        onClick={() => deleteTodo(todo.id)}
                        className="cursor-pointer whitespace-nowrap px-6 py-4 text-sm font-light text-red-600"
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTodos;
