# Bright Future Academy - School Website

A modern, responsive school website built with Next.js 15, TypeScript, and Tailwind CSS. The architecture is designed to easily switch between mock data and real backend API calls.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful UI
- **Modern Architecture**: Clean separation of concerns with services layer
- **Type Safety**: Full TypeScript support with proper interfaces
- **Mock Data Ready**: Comprehensive mock data for development
- **Backend Ready**: Easy switch to real API endpoints
- **SEO Optimized**: Proper metadata and Open Graph tags
- **Accessible**: WCAG compliant components

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── services/             # API service layer
│   └── api.ts           # All API calls (mock/real)
├── types/               # TypeScript interfaces
│   └── school.ts        # Data type definitions
├── data/                # Mock data
│   └── mockData.ts      # Sample content
└── config/              # Configuration
    └── app.ts           # App configuration
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **API**: Fetch API with service layer
- **Deployment**: Vercel ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK_DATA=true

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Switching from Mock to Real Backend

1. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```

2. **Backend API Endpoints Required**:
   The backend should implement these endpoints:

   ```typescript
   // School Information
   GET /api/school/info
   PUT /api/school/info

   // News
   GET /api/news
   GET /api/news/:id
   POST /api/news

   // Events
   GET /api/events
   GET /api/events/upcoming

   // Faculty
   GET /api/faculty
   GET /api/faculty/department/:department

   // Students
   GET /api/students
   GET /api/students/grade/:grade

   // Programs
   GET /api/programs

   // Contact
   GET /api/contact
   POST /api/contact/send
   ```

3. **Data Format**: Ensure your backend returns data in the same format as defined in `src/types/school.ts`

## 📊 Data Models

### School Information
```typescript
interface SchoolInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  established: number;
  logo?: string;
}
```

### News Items
```typescript
interface NewsItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
  author: string;
  category: 'announcement' | 'event' | 'achievement' | 'general';
}
```

### Events
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  isUpcoming: boolean;
}
```

## 🎨 Customization

### Styling
- Colors are defined in `src/config/app.ts`
- Tailwind classes are used throughout
- Custom CSS can be added to `src/app/globals.css`

### Content
- Mock data is in `src/data/mockData.ts`
- School information is in `src/config/app.ts`
- Update these files to customize content

### Components
- UI components are in `src/components/ui/`
- Layout components are in `src/components/layout/`
- All components are reusable and customizable

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔍 SEO Features

- Meta tags for all pages
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready
- Semantic HTML

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email info@brightfutureacademy.edu or create an issue in the repository.

## 🔄 Migration Guide

### From Mock to Backend

1. **Test Backend Endpoints**: Ensure all endpoints return correct data format
2. **Update Environment**: Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
3. **Test Thoroughly**: Verify all features work with real data
4. **Error Handling**: Add proper error handling for API failures
5. **Performance**: Optimize API calls and add caching if needed

### Adding New Features

1. **Define Types**: Add interfaces in `src/types/school.ts`
2. **Create Mock Data**: Add sample data in `src/data/mockData.ts`
3. **Add API Service**: Create service functions in `src/services/api.ts`
4. **Build Components**: Create UI components
5. **Update Pages**: Integrate new features into pages

---

Built with ❤️ for educational excellence
