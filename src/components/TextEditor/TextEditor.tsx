import { FC, useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";

const TextEditor: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLElement | null>(null);
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
      <section ref={editorRef}>
        <MDEditor />
      </section>
    );
  }
  return (
    <section onClick={() => setIsEditing(true)}>
      <MDEditor.Markdown source={"# Header"} />
    </section>
  );
};

export default TextEditor;
