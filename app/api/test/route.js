import { NextResponse } from "next/server";
import getAiResponse from "@/config/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `create a todo app Generate a fully functional, aesthetically modern production-ready React project using Vite. Follow this strict structure and rules:
  
  Use Tailwind CSS for styling only. DO NOT use any third-party UI component libraries.
  
  Use Lucide React icons only when appropriate, and only from this set: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight.
  Example usage:
  
  js
  Copy
  Edit
  import { Heart } from "lucide-react";  
  <Heart className="w-5 h-5 text-red-500" />
  Use JSX syntax, React hooks, and proper folder structure.
  
  Split the app into multiple components and organize them in folders, using .js files only.
  
  Use only the following additional libraries if explicitly needed or requested:
  "date-fns", "react-chartjs-2", "firebase", "@google/generative-ai".
  
  For images, use working and valid image URLs only from https://images.unsplash.com/ that can be used directly in img tags.
  
  Avoid using localStorage, cookies, or any persistence layer unless requested.
  
  Do not include unnecessary features or files—keep the output focused, beautiful, and useful.
  
  Ensure the app is large in scope, with rich UI features, and that everything works perfectly without bugs or errors.
  
  Do not make the UI look childish or basic. It should be visually elegant, modern, clean, and polished using advanced layout principles like grids, responsive design, shadows, rounded corners, and vibrant yet professional color schemes.
  
  Output Format:
  
  {
    "projectTitle": "Project Title Here",
    "explanation": "A concise explanation of the project's structure, purpose, and key features. It should be detailed enough to understand the architecture and how components interact.",
    "files": {
      "/App.js": {
        "code": "code here..."
      },
      ...
    },
    "generatedFiles": [
      "/App.js",
      ...
    ]
  }
  Important Notes:
  
  Prefer Using dark mode
  
  All code must be correct and ready to run without modification.
  
  All files used must be listed inside the generatedFiles array.
  
  You MUST include all files used in the project including App.js, components, utility files, and page files.
  
  File code should use double quotes and be wrapped correctly in JSON.
  
  Use well-structured folder hierarchy. For example:
  
  
  /components
    /Navbar
      Navbar.js
    /Footer
      Footer.js
    /Card
      Card.js
  /pages
    Home.js
    About.js
  /assets
    (for image URLs or future placeholders)`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "projectTitle": "Modern Todo App",
    "explanation": "This project implements a modern and aesthetically pleasing Todo application using React and Vite. It leverages Tailwind CSS for styling and Lucide React icons for visual elements. The app is structured into components for reusability and maintainability. The main features include adding, editing, deleting, and marking todos as complete, all with a clean and intuitive dark mode user interface.",
    "files": {
      "/App.js": {
        "code": "import React, { useState, useEffect } from 'react';\\nimport TodoList from './components/TodoList/TodoList';\\nimport TodoForm from './components/TodoForm/TodoForm';\\nimport Header from './components/Header/Header';\\nimport Footer from './components/Footer/Footer';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const storedTodos = localStorage.getItem('todos');\\n    return storedTodos ? JSON.parse(storedTodos) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('todos', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text) => {\\n    if (!text.trim()) return;\\n    setTodos([...todos, { id: Date.now(), text, completed: false }]);\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter(todo => todo.id !== id));\\n  };\\n\\n  const editTodo = (id, newText) => {\\n    if (!newText.trim()) return;\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));\\n  };\\n\\n  return (\\n    <div className=\\"bg-gray-900 text-gray-100 min-h-screen flex flex-col\\">\\n      <Header />\\n      <main className=\\"container mx-auto p-4 flex-grow\\">\\n        <TodoForm onAdd={addTodo} />\\n        <TodoList\\n          todos={todos}\\n          onToggle={toggleComplete}\\n          onDelete={deleteTodo}\\n          onEdit={editTodo}\\n        />\\n      </main>\\n      <Footer />\\n    </div>\\n  );\\n}\\n\\nexport default App;"
      },
      "/components/TodoList/TodoList.js": {
        "code": "import React from 'react';\\nimport TodoItem from '../TodoItem/TodoItem';\\n\\nfunction TodoList({ todos, onToggle, onDelete, onEdit }) {\\n  return (\\n    <ul className=\\"mt-4\\">\\n      {todos.map(todo => (\\n        <TodoItem\\n          key={todo.id}\\n          todo={todo}\\n          onToggle={onToggle}\\n          onDelete={onDelete}\\n          onEdit={onEdit}\\n        />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;"
      },
      "/components/TodoItem/TodoItem.js": {
        "code": "import React, { useState } from 'react';\\nimport { Trash, Edit, Check } from 'lucide-react';\\n\\nfunction TodoItem({ todo, onToggle, onDelete, onEdit }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editText, setEditText] = useState(todo.text);\\n\\n  const handleEdit = () => {\\n    onEdit(todo.id, editText);\\n    setIsEditing(false);\\n  };\\n\\n  return (\\n    <li className=\\"flex items-center justify-between py-2 border-b border-gray-700 last:border-none\\">\\n      {isEditing ? (\\n        <input\\n          type=\\"text\\"\\n          value={editText}\\n          onChange={(e) => setEditText(e.target.value)}\\n          onBlur={handleEdit}\\n          className=\\"bg-gray-800 text-gray-100 rounded px-2 py-1 focus:outline-none\\"\\n        />\\n      ) : (\\n        <span\\n          onClick={() => onToggle(todo.id)}\\n          className={\`cursor-pointer \${todo.completed ? 'line-through text-gray-500' : ''}\`}\\n        >\\n          {todo.text}\\n        </span>\\n      )}\\n      <div>\\n        <button onClick={() => onToggle(todo.id)} className=\\"mr-2 text-green-500 hover:text-green-400 focus:outline-none\\">\\n          <Check className=\\"w-5 h-5\\"/>\\n        </button>\\n        <button onClick={() => setIsEditing(true)} className=\\"mr-2 text-blue-500 hover:text-blue-400 focus:outline-none\\">\\n          <Edit className=\\"w-5 h-5\\"/>\\n        </button>\\n        <button onClick={() => onDelete(todo.id)} className=\\"text-red-500 hover:text-red-400 focus:outline-none\\">\\n          <Trash className=\\"w-5 h-5\\"/>\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;"
      },
      "/components/TodoForm/TodoForm.js": {
        "code": "import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction TodoForm({ onAdd }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    onAdd(text);\\n    setText('');\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"flex items-center\\">\\n      <input\\n        type=\\"text\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        placeholder=\\"Add a new todo...\\"\\n        className=\\"bg-gray-800 text-gray-100 rounded px-4 py-2 mr-2 w-full focus:outline-none\\"\\n      />\\n      <button type=\\"submit\\" className=\\"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none\\">\\n        <Plus className=\\"w-5 h-5 inline-block mr-2\\"/> Add\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default TodoForm;"
      },
      "/components/Header/Header.js": {
        "code": "import React from 'react';\\n\\nfunction Header() {\\n  return (\\n    <header className=\\"bg-gray-800 py-4\\">\\n      <div className=\\"container mx-auto text-center\\">\\n        <h1 className=\\"text-2xl font-bold text-white\\">My Todo App</h1>\\n      </div>\\n    </header>\\n  );\\n}\\n\\nexport default Header;"
      },
      "/components/Footer/Footer.js": {
        "code": "import React from 'react';\\n\\nfunction Footer() {\\n  return (\\n    <footer className=\\"bg-gray-800 py-4\\">\\n      <div className=\\"container mx-auto text-center\\">\\n        <p className=\\"text-gray-400\\">© {new Date().getFullYear()} My Todo App. All rights reserved.</p>\\n      </div>\\n    </footer>\\n  );\\n}\\n\\nexport default Footer;"
      }
    },
    "generatedFiles": [
      "/App.js",
      "/components/TodoList/TodoList.js",
      "/components/TodoItem/TodoItem.js",
      "/components/TodoForm/TodoForm.js",
      "/components/Header/Header.js",
      "/components/Footer/Footer.js"
    ]
  }
  \`\`\``,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `INSERT_INPUT_HERE`,
          },
        ],
      },
    ];
    const response = await getAiResponse(prompt,contents);
    console.log(response.text)
    const parsedResponse = JSON.parse(response.text);
    return NextResponse.json({ response: parsedResponse });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }

  //   return NextResponse.json({ response : "testing" });
}
