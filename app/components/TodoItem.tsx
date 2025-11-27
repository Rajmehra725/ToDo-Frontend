"use client";
import React from "react";

interface TodoProps {
  id: string;
  text: string;
  done: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TodoItem({ id, text, done, onToggle, onEdit, onDelete }: TodoProps) {
  return (
    <div
      className={`list-group-item d-flex justify-content-between align-items-center ${
        done ? "list-group-item-success" : ""
      }`}
    >
      <div>
        <input type="checkbox" className="form-check-input me-3" checked={done} onChange={onToggle} />
        <span style={{ textDecoration: done ? "line-through" : "none", fontSize: "1.1rem" }}>{text}</span>
      </div>

      <div>
        <button className="btn btn-sm btn-warning me-2" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
