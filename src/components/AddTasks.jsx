import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 flex flex-col rounded-md shadow">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite o descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("preenche o trem viado");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar
      </Button>
    </div>
  );
}

export default AddTasks;
