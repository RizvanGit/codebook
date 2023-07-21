import { FC, useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";
import { useAppSelector } from "../../hooks/hooks";

const TextEditor: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("# Header");
  const editorRef = useRef<HTMLElement | null>(null);
  const cellState = useAppSelector((state) => state.cells);
  console.log(cellState);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        event.target &&
        editorRef.current &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  if (isEditing) {
    return (
      <section ref={editorRef} className="text-editor">
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </section>
    );
  }
  return (
    <section onClick={() => setIsEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </section>
  );
};

export default TextEditor;
