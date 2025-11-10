# 🚀 Advanced Task Manager - Full Stack Next.js Application

A comprehensive task management application showcasing **advanced React patterns** and **modern web development practices**.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

## ✨ Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete tasks
- 🎨 **Dark/Light Theme** - Toggle between themes with persistence
- 🔍 **Real-time Search** - Debounced search with instant results
- 🎯 **Smart Filtering** - Filter by priority and category
- 📊 **Live Statistics** - Dashboard with task analytics
- 💾 **Local Storage** - Automatic data persistence
- 🎭 **Advanced React Patterns** - Production-ready code architecture

## 🏗️ Architecture & Advanced Concepts

### **Context API**
- `ThemeContext` - Global theme management
- `AuthContext` - User authentication state
- `NotificationContext` - Toast notifications

### **Custom Hooks**
- `useLocalStorage` - Persistent state with sync
- `useDebounce` - Performance optimization for search
- `useIntersectionObserver` - Lazy rendering
- `usePrevious` - Access previous values

### **State Management**
- `useReducer` - Complex task state management
- Optimistic UI updates
- Immutable state patterns

### **Performance Optimization**
- `React.memo` - Component memoization
- `useMemo` - Expensive computation caching
- `useCallback` - Function reference stability
- Code splitting ready

### **Design Patterns**
- Higher-Order Components (HOC)
- Compound Components (Modal)
- Render Props Pattern
- Error Boundaries

### **Component Architecture**

src/
├── app/              # Next.js App Router
├── components/       # React Components
│   ├── ErrorBoundary
│   ├── Modal (Compound)
│   ├── Task
│   ├── Statistics
│   └── Layout
├── context/          # Context Providers
├── hooks/            # Custom Hooks
├── reducers/         # State Reducers
├── hoc/              # Higher-Order Components
└── lib/              # Utilities
## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/advanced-task-manager.git

# Navigate to project
cd advanced-task-manager

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production
```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** Context API + useReducer
- **Storage:** LocalStorage API

## 📖 Learning Resources

This project demonstrates:
- ✅ React Hooks (useState, useEffect, useCallback, useMemo, useReducer, useRef, useContext)
- ✅ Custom Hook patterns
- ✅ Context API for state management
- ✅ Component composition
- ✅ Error handling
- ✅ Performance optimization
- ✅ Responsive design
- ✅ Accessibility best practices

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name - [@yourhandle](https://twitter.com/yourhandle)

Project Link: [https://github.com/YOUR-USERNAME/advanced-task-manager](https://github.com/YOUR-USERNAME/advanced-task-manager)

## 🙏 Acknowledgments

- Next.js Team
- React Community
- Tailwind CSS
- Lucide Icons