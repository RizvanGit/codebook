<h1>cnbook - code and text editor</h1>

<h2>Description</h2>
<p>This is an interactive coding application. You can write Javascript, see it executed, and write comprehensive documentation useing markdow</p>
<p>You can write React code and import any available packages. Example: <code>import axios from 'axios'</code></p>
<ul>
  <li>You can add two types of cells: code cell and text cell<i>(click to edit)</i>.</li>
  <li>The code in each code editor is all joined into one file. A variable defined in a code cell is available in any following code cell</li>
  <li>You can show any React component, string, number, etc. by calling <code>render()</code> function. This function is pre-built into this encironment</li>
  <li>Re-order or delete cells using the buttons on the top right of a cell</li>
  <li>Add new cells by hovering on the divider between each cell</li>
</ul>
<p>All of you changes get saved to the file you opened cnbook with</p>
<h2>Download</h2>
<p>You can install cnbook by running: <code>npx cnbook serve</code> in your terminal</p>
<ul>Available commands:
  <li>You can specify a file which will include your saved code: <code>npx cnbook serve name.js</code></li>
  <li>Run app on any port: <code>npx cnbook serve --port 4010</code></li>
</ul>
