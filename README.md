# BD Counselling Frontend

A modern, responsive React application for medical counselling information and guidance. Built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with excellent mobile and desktop experience
- **State Management**: Dynamic tab system for different counselling categories
- **Data Integration**: API-ready with mock data for development
- **Modern UI**: Beautiful gradients, animations, and glassmorphism effects
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized with Vite and modern React patterns

## 📱 Mobile-First Design

The application is specifically designed for mobile devices with:
- Touch-friendly interfaces
- Optimized layouts for small screens
- Responsive navigation
- Fast loading times
- Intuitive user experience

<!-- ## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bd_counselling_frontend_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment on Vercel

### Automatic Deployment

1. **Connect to Vercel**
   - Push your code to GitHub/GitLab
   - Connect your repository to Vercel
   - Vercel will automatically detect the Vite configuration

2. **Environment Variables** (Optional)
   ```env
   REACT_APP_API_URL=https://your-api-endpoint.com/api
   ```

3. **Deploy**
   - Vercel will automatically build and deploy your app
   - The `vercel.json` configuration handles routing

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StateTabs.tsx   # Dynamic tab system
│   ├── MainContent.tsx # Main dashboard content
│   ├── RightSidebar.tsx # Sidebar with quick access
│   └── ...
├── pages/              # Page components
├── services/           # API and data services
│   └── dataService.ts  # Data fetching and management
├── contexts/           # React contexts
└── ...
```

## 🎯 Key Components

### StateTabs Component
- Dynamic tab management with add/remove functionality
- Category-based filtering
- Search functionality
- Mobile-responsive design
- Modal for adding new tabs

### MainContent Component
- Mobile-first responsive design
- Hero section with action buttons
- Data cards for different sections
- Timeline and statistics
- Integration with StateTabs

### DataService
- API integration ready
- Mock data for development
- TypeScript interfaces
- Error handling
- Search and filter functionality

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and building:
- TypeScript support
- Hot module replacement
- Optimized builds
- Environment variable handling

### Tailwind Configuration
Custom Tailwind configuration with:
- Custom color palette
- Responsive breakpoints
- Custom animations
- Glassmorphism utilities

## 📊 Data Structure

The application supports multiple data types:
- **Allotments**: College allotment data
- **Closing Ranks**: Rank-based admission data
- **Seat Matrix**: Available seats information
- **Fee, Stipend & Bond**: Financial information

## 🎨 UI/UX Features

- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Grid**: Flexible layouts for all screen sizes
- **Interactive Elements**: Hover effects and micro-interactions

## 🔍 Search and Filter

- **Real-time Search**: Instant search across all data
- **Category Filtering**: Filter by counselling type
- **Advanced Filters**: Multiple filter options
- **Sorting**: Sort by various criteria

## 📱 Mobile Optimization

- **Touch Targets**: Minimum 44px touch areas
- **Swipe Gestures**: Mobile-friendly navigation
- **Optimized Images**: WebP format with fallbacks
- **Fast Loading**: Optimized bundle sizes
- **Offline Support**: Service worker ready

## 🚀 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Automatic image optimization
- **Caching**: Efficient caching strategies
- **Bundle Analysis**: Built-in bundle analyzer

## 🔒 Security

- **Environment Variables**: Secure API key management
- **Input Validation**: Client-side validation
- **XSS Protection**: React's built-in protection
- **HTTPS**: Secure connections

## 📈 Analytics

Ready for analytics integration:
- Google Analytics
- Vercel Analytics
- Custom event tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔄 Updates

Stay updated with:
- Regular dependency updates
- Security patches
- Feature additions
- Performance improvements

---

**Built with ❤️ for the medical counselling community** -->