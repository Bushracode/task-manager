# Task Manager

A productive task management application for organizing, tracking, and completing your daily tasks. Built with vanilla HTML, CSS, and JavaScript.

## Overview

Task Manager is a lightweight, intuitive application for managing your to-do list and project tasks. Features include priority levels, due dates, categories, and progress tracking.

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript |
| **Architecture** | Vanilla JS (No frameworks) |
| **Styling** | CSS3 (Flexbox/Grid) |
| **Storage** | Browser LocalStorage |
| **Deployment** | Vercel |

## Features

- ✅ Add, edit, delete tasks
- 🎯 Set priority levels (High, Medium, Low)
- 📅 Due date management
- 🏷️ Task categories/tags
- ✔️ Mark tasks complete
- 🔍 Search and filter tasks
- 📊 Progress visualization
- 💾 Auto-save to LocalStorage
- 📱 Responsive mobile-first design
- 🎨 Beautiful UI with animations

## Getting Started

### Prerequisites
- Modern web browser
- No installation required!

### Installation

```bash
git clone https://github.com/Bushracode/task-manager.git
cd task-manager
```

### Running Locally

```bash
# Using Python
python -m http.server 8000

# Using Node
npx http-server
```

Open `http://localhost:8000` in your browser.

## Usage Guide

### Creating a Task

1. Click "New Task" button
2. Enter task title
3. (Optional) Set priority: High 🔴, Medium 🟡, Low 🟢
4. (Optional) Add due date
5. (Optional) Assign category
6. Click "Add Task"

### Managing Tasks

- **Complete**: Click checkbox to mark done
- **Edit**: Click task to edit details
- **Delete**: Click trash icon
- **Search**: Use search bar to filter
- **Filter**: By priority, category, or status

### Categories

Pre-defined categories:
- 🏢 Work
- 🏠 Personal
- 🎓 Learning
- 🛒 Shopping
- 🎯 Goals

## Project Structure

```
task-manager/
├── index.html          # Main interface
├── style.css           # Styling and animations
├── script.js           # Task logic
├── assets/
│   └── icons/          # SVG icons
└── README.md
```

## Features in Detail

### Priority System
- **High** 🔴: Urgent, do first
- **Medium** 🟡: Important, schedule time
- **Low** 🟢: Nice to have

### Due Dates
- Set date and optional time
- Visual indicators for overdue tasks
- Smart sorting by due date

### LocalStorage
- Automatic save (no login needed)
- Persistent data across sessions
- Data stored locally (private)

## Customization

### Colors

Edit CSS variables:

```css
:root {
  --primary-color: #2D4F3E;
  --secondary-color: #DEDBD2;
  --text-color: #1A1A1A;
  --high-priority: #F44336;
  --medium-priority: #FFC107;
  --low-priority: #4CAF50;
}
```

### Categories

Modify in `script.js`:

```javascript
const DEFAULT_CATEGORIES = [
  { name: 'Work', color: '#FF5722' },
  { name: 'Personal', color: '#2196F3' },
];
```

## Live Demo

Try it now: [Task Manager](https://task-manager-zubu2.vercel.app)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies
- Fast initial load (<200ms)
- Smooth animations (60fps)
- Optimized for mobile devices

## Accessibility

- ARIA labels for screen readers
- High color contrast
- Keyboard navigation
- Semantic HTML structure
- Focus indicators

## Tips & Tricks

1. **Prioritize Daily**: Review and prioritize tasks each morning
2. **Break Down**: Split large tasks into smaller subtasks
3. **Set Realistic Deadlines**: Be honest about time estimates
4. **Review Weekly**: Reflect on completed tasks
5. **Use Categories**: Stay organized with clear grouping

## Future Enhancements

- [ ] Cloud sync (Firebase, MongoDB)
- [ ] User accounts & authentication
- [ ] Recurring tasks
- [ ] Subtasks/nested items
- [ ] Attachments & notes
- [ ] Collaboration features
- [ ] Mobile app (React Native)
- [ ] Calendar view
- [ ] Analytics dashboard

## License

MIT License - Feel free to use and modify

---

**Built with ❤️ by Bushracode | Stay Productive, Stay Organized**
