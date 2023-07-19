import { FC, useEffect, useRef } from "react";
import "./Preview.css";

interface IPreviewProps {
  code: string;
  bundleStatus: string;
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
          const handleError = (error) => {
                  const root = document.querySelector('#root')
                  root.innerHTML = '<div style="color: red; font-weight: 500"><h4>Runtime error</h4>' + error + '</div>'
                  console.error('iframe error: ', error)
          }
          window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(event.error)
              })
          window.addEventListener("message", (event) => {
                try{
                  eval(event.data)
                } catch(error){
                  handleError(error)
                }
              }, false)
        </script>
      </body>
    </html>
    `;

const Preview: FC<IPreviewProps> = ({ code, bundleStatus }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        srcDoc={html}
        title="codebox"
        sandbox="allow-scripts"
      />
      {bundleStatus && (
        <div className="preview-error">
          <h3>An error occurred!</h3>
          {bundleStatus}
        </div>
      )}
    </div>
  );
};

export default Preview;
