import { useAppSelector } from "./useTypedSelector";

export const useCombinedCode = (cellId: string) => {
  return useAppSelector((state) => {
    const { data, order } = state.cells;

    const orderedCells = order.map((id) => data[id]);
    const renderEmptyFunc = "var render = () => {}";
    const renderFunction = `
      import _React from 'react'
      import _ReactDOM from 'react-dom'
      var render = (value) => {
        const rootNode = document.querySelector('#root');
        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            _ReactDOM.render(value, rootNode)
          } else{
            rootNode.innerHTML = JSON.stringify(value);
          }
        } else {
          rootNode.innerHTML = value
        }
      }
    `;
    const combinedCode = [];
    for (let code of orderedCells) {
      if (code.type === "code") {
        if (code.id === cellId) {
          combinedCode.push(renderFunction);
        } else {
          combinedCode.push(renderEmptyFunc);
        }
        combinedCode.push(code.content);
      }
      if (code.id === cellId) {
        break;
      }
    }
    return combinedCode.join("\n");
  });
};
