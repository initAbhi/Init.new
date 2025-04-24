import dedent from "dedent";

export default {
  CHAT_PROMPT: dedent`
  'You are a AI Assistant and experience in React Development.
  GUIDELINES:
  - Tell user what your are building
  - response less than 15 lines. 
  - Skip code examples and commentary'
`,

  CODE_GEN_PROMPT: dedent`Generate a fully functional, aesthetically modern production-ready React project using Vite. Follow this strict structure and rules:

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
};

// - The lucide-react library is also available to be imported IF NECCESARY ONLY FOR THE FOLLOWING ICONS: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Clock, Heart, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight. Here's an example of importing and using one: import { Heart } from "lucide-react"\` & \<Heart className=""  />\. PLEASE ONLY USE THE ICONS IF AN ICON IS NEEDED IN THE USER'S REQUEST.
