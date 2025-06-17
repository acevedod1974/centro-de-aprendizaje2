# Centro de Aprendizaje de Ingeniería Mecánica - Project Replication Prompt

## Project Overview
Create a comprehensive educational platform for mechanical engineering focused on manufacturing processes. This is a React + TypeScript application with Tailwind CSS, featuring interactive tools, simulators, and educational content.

## Core Requirements

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with dark/light theme support
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts (if needed)
- **Database**: Supabase (configured but not actively used)

### Application Structure
The app should have a single-page application structure with these main sections:

1. **Header**: Navigation with theme toggle, responsive design
2. **Home**: Landing page with feature overview and statistics
3. **Procesos**: Manufacturing processes documentation
4. **Herramientas**: Interactive tools and simulators
5. **Recursos**: Multimedia resources and documentation
6. **Evaluación**: Quiz and assessment system
7. **Footer**: Contact information and links

### Key Features to Implement

#### 1. Theme System
- Dark/light mode toggle that persists in localStorage
- System preference detection
- Smooth transitions between themes
- Applied via Tailwind's dark mode classes

#### 2. Interactive Tools Section
Create these specific tools:

**A. Calculadora de Velocidad de Corte**
- Input: Material type, diameter, cutting speed, feed rate
- Output: RPM calculations, feed per minute
- Formula display and recommendations
- Material presets (steel, aluminum, copper, etc.)

**B. Simulador de Forjado**
- Real-time simulation with play/pause controls
- Parameters: temperature, force, material type, forging type
- Visual representation of deformation process
- Temperature loss over time simulation

**C. Simulador de Mecanizado CNC**
- Machine types: lathe, milling, drilling
- Material and tool selection
- Real-time material removal simulation
- Tool wear calculation and warnings

**D. Quiz de Soldadura**
- 5 technical questions about welding processes
- Multiple choice format with explanations
- Progress tracking and scoring
- Results summary with performance analysis

**E. Inspector de Control de Calidad**
- Dimensional inspection tool
- Tolerance checking against specifications
- Visual representation of parts
- Pass/fail analysis with recommendations

#### 3. Procesos Section
Comprehensive manufacturing processes documentation organized by categories:

**Categories:**
- **Remoción de Material**: Torneado, Fresado, Taladrado, Rectificado
- **Conformado**: Forjado, Estampado, Laminado, Extrusión
- **Unión**: Soldadura, Remachado, Adhesivos, Brazing
- **Moldeo**: Fundición, Inyección, Sinterizado, Moldeo en Arena

**Each process should include:**
- Detailed technical description
- Applications and use cases
- Key parameters and variables
- Advantages and limitations
- Typical materials and tools
- Links to related simulators

#### 4. Evaluación Section
Enhanced quiz system with:
- 9 specialized modules (Soldadura, Mecanizado, Conformado, etc.)
- Different difficulty levels (Básico, Intermedio, Avanzado)
- Statistics and completion tracking
- Performance analytics
- Study recommendations

#### 5. Recursos Section
- Searchable resource library
- Categories: Manuals, Images, Videos, References
- Download functionality (simulated)
- Quick access to popular resources

### Design Requirements

#### Visual Design
- Modern, professional appearance suitable for educational use
- Gradient backgrounds and cards
- Smooth animations and micro-interactions
- Consistent color scheme with blue/purple primary colors
- Apple-level design aesthetics with attention to detail

#### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Collapsible navigation for mobile
- Touch-friendly interface elements

#### Accessibility
- Proper contrast ratios for both themes
- Keyboard navigation support
- Screen reader friendly
- Focus indicators

### Content Specifications

#### Branding
- **Title**: "Centro de Aprendizaje de Ingeniería Mecánica"
- **Year**: 2025
- **Location**: Ciudad Guayana, Venezuela
- **Contact**: info@ingenieriacentro.edu.ve, +58 286 123 4567

#### Statistics (for Home page)
- 16+ Manufacturing Processes
- 5 Interactive Tools
- 7,200+ Active Students
- 97% Success Rate

#### Color Scheme
- **Primary**: Blue to Purple gradients
- **Secondary**: Green, Orange, Red for different categories
- **Neutral**: Gray scales for text and backgrounds
- **Success**: Green tones
- **Warning**: Yellow/Orange tones
- **Error**: Red tones

### Technical Implementation Details

#### File Structure
```
src/
├── components/
│   ├── Header.tsx
│   ├── Home.tsx
│   ├── ProcessSection.tsx
│   ├── ToolsSection.tsx
│   ├── ResourcesSection.tsx
│   ├── EvaluationSection.tsx
│   ├── Footer.tsx
│   └── tools/
│       ├── VelocidadCorteCalculator.tsx
│       ├── ForjadoSimulator.tsx
│       ├── MecanizadoSimulator.tsx
│       ├── SoldaduraQuiz.tsx
│       └── CalidadInspector.tsx
├── contexts/
│   └── ThemeContext.tsx
├── App.tsx
└── main.tsx
```

#### State Management
- Use React hooks (useState, useEffect) for local state
- Context API for theme management
- No external state management library needed

#### Animation Requirements
- Page transitions using Framer Motion
- Hover effects on interactive elements
- Loading states for simulators
- Smooth theme transitions
- Micro-interactions for better UX

### Specific Implementation Notes

1. **Theme Toggle**: Must work reliably, persist settings, and respect system preferences
2. **Simulators**: Should have realistic physics/calculations and visual feedback
3. **Navigation**: Single-page app with section switching, no routing library needed
4. **Mobile Experience**: Fully functional on mobile devices with touch interactions
5. **Performance**: Optimized for fast loading and smooth interactions

### Content Accuracy
All technical content should be accurate for mechanical engineering education, including:
- Correct formulas for machining calculations
- Realistic material properties and parameters
- Industry-standard terminology and processes
- Educational value with practical applications

### Deployment
- Build optimized for production
- Compatible with static hosting (Netlify, Vercel, etc.)
- No server-side requirements
- Environment variables for any external services

This prompt should provide enough detail to recreate the entire application with all its features, design elements, and functionality.