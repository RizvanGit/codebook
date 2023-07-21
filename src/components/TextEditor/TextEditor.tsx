import { FC, useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { cellActions } from "../../state/reducers/cellsReducer";
import "./TextEditor.css";
import { ICell } from "../../state";
import { useAppDispatch } from "../../hooks/use-typed-dispatch";

interface ITextEditorProps {
  cell: ICell;
}
const TextEditor: FC<ITextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLElement | null>(null);

  const dispatch = useAppDispatch();

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

  const onChangeTextEditor = (value: string | undefined) => {
    dispatch(cellActions.updateCell({ id: cell.id, content: value || "" }));
  };

  if (isEditing) {
    return (
      <section ref={editorRef} className="text-editor">
        <MDEditor value={cell.content} onChange={onChangeTextEditor} />
      </section>
    );
  }
  return (
    <section onClick={() => setIsEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </section>
  );
};

export default TextEditor;
