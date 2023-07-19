import { FC, useEffect, useRef } from "react";
import "./Preview.css";

interface IPreviewProps {
  code: string;
}

const html = `
    <html>
      <head>
       <style>
       html {
         background-color: #fdfcdc;
       }
       </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
                try{
                  eval(event.data)
                } catch(error){
                  const root = document.getElementById('root')
                  root.innerHTML = '<div style="color: red; font-weight: 500"><h4>Runtime error</h4>' + error + '</div>'
                  console.error(error)
                }
              }, false)
        </script>
      </body>
    </html>
    `;

const Preview: FC<IPreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        srcDoc={html}
        title="codebox"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
