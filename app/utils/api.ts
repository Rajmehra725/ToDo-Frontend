const API = "https://todo-cyy0.onrender.com/api/todos";

export const fetchTodos = async () => {
  const res = await fetch(API);
  return res.json();
};

export const addTodo = async (text: string) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

export const updateTodo = async (id: string, text: string, done: boolean) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, done }),
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  return res.json();
};

export const toggleTodo = async (id: string, done: boolean, text: string) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !done, text }),
  });
  return res.json();
};
