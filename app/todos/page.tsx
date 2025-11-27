"use client";
import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import Toast from "../components/Toast";
import * as api from "../utils/api";

interface Todo {
  _id: string;
  text: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const loadTodos = async () => {
    const data = await api.fetchTodos();
    if (data.success) setTodos(data.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const showToast = (message: string, type?: "success" | "error") => {
    setToast({ message, type });
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    const data = await api.addTodo(text);
    if (data.success) {
      setText("");
      loadTodos();
      showToast("Todo Added Successfully", "success");
    }
  };

  const handleDelete = async (id: string) => {
    const data = await api.deleteTodo(id);
    if (data.success) {
      loadTodos();
      showToast("Todo Deleted", "success");
    }
  };

  const handleToggle = async (todo: Todo) => {
    const data = await api.toggleTodo(todo._id, todo.done, todo.text);
    if (data.success) loadTodos();
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  };

  const submitEdit = async () => {
    if (!editText.trim() || !editId) return;
    const data = await api.updateTodo(editId, editText, false);
    if (data.success) {
      setEditId(null);
      setEditText("");
      loadTodos();
      showToast("Todo Updated Successfully", "success");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold">📝 Premium Todo App</h1>
        <p className="text-muted">Manage your tasks efficiently and stylishly</p>
      </div>

      {/* Add / Edit */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex gap-2 flex-wrap">
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder={editId ? "Edit your task..." : "Add new task..."}
            value={editId ? editText : text}
            onChange={(e) => (editId ? setEditText(e.target.value) : setText(e.target.value))}
          />
          <button className={`btn ${editId ? "btn-success" : "btn-primary"}`} onClick={editId ? submitEdit : handleAdd}>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button className="btn btn-outline-secondary" onClick={() => setEditId(null)}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Todo List */}
      <div className="list-group mb-3 shadow-sm">
        {todos.length === 0 && <p className="text-center text-muted py-3">No tasks added yet...</p>}
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            id={todo._id}
            text={todo.text}
            done={todo.done}
            onToggle={() => handleToggle(todo)}
            onEdit={() => startEdit(todo)}
            onDelete={() => handleDelete(todo._id)}
          />
        ))}
      </div>

      {/* Batch Actions */}
      {todos.length > 0 && (
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              for (let t of todos.filter((t) => t.done)) await handleDelete(t._id);
            }}
          >
            Delete Completed
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={async () => {
              for (let t of todos) if (!t.done) await handleToggle(t);
            }}
          >
            Mark All Done
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
