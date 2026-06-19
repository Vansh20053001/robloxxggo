# RobloxGo - Roblox Game Discovery Platform

A modern, fully responsive React + Vite web application for discovering and exploring Roblox games with detailed information, ratings, reviews, game codes, events, and developer profiles.

## 🚀 Features

- **Game Discovery**: Browse and search over 50 Roblox games with detailed information
- **Game Rankings**: View top games by popularity, rating, and player count
- **Smart Search**: Search games by title, category, developer, and tags
- **Categories**: Filter games by 16 different categories
- **Game Details**: Comprehensive game pages with ratings, reviews, stats, and codes
- **Developer Profiles**: Explore developer information and their game creations
- **Game Codes**: Find and copy active promotional codes with rewards
- **Events**: Discover upcoming game events and tournaments
- **Responsive Design**: Fully mobile-friendly with dark theme
- **Fast & Modern**: Built with Vite for lightning-fast development and build times
- **No External Dependencies**: Uses only React and React Router (CSS-only, no Tailwind)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation header with search
│   ├── Footer.jsx              # Site footer with links
│   ├── Layout.jsx              # Main layout wrapper
│   ├── GameCard.jsx            # Game card component
│   ├── GameGrid.jsx            # Grid for displaying games
│   ├── SearchBar.jsx           # Search input component
│   ├── Sidebar.jsx             # Category filter sidebar
│   ├── Pagination.jsx          # Pagination controls
│   ├── StatBox.jsx             # Statistics display box
│   ├── DeveloperCard.jsx       # Developer profile card
│   ├── CodeCard.jsx            # Game code display card
│   ├── EventCard.jsx           # Event information card
│   ├── RankingList.jsx         # Ranking list display
│   └── NotFound.jsx            # 404 component
├── pages/
│   ├── Home.jsx                # Homepage with featured games
│   ├── AllGames.jsx            # Browse all games
│   ├── GameDetails.jsx         # Individual game details page
│   ├── Categories.jsx          # Categories listing
│   ├── CategoryDetails.jsx     # Games in category
│   ├── Codes.jsx               # Game codes directory
│   ├── Events.jsx              # Events calendar
│   ├── Developers.jsx          # Developer directory
│   ├── DeveloperDetails.jsx    # Individual developer profile
│   ├── SearchResults.jsx       # Search results page
│   ├── About.jsx               # About page
│   ├── Contact.jsx             # Contact form
│   ├── Privacy.jsx             # Privacy policy
│   ├── Terms.jsx               # Terms of service
│   └── NotFoundPage.jsx        # 404 page
├── data/
│   ├── games.json              # 50+ game data
│   ├── developers.json         # Developer profiles
│   ├── categories.json         # Game categories
│   ├── codes.json              # Promotional game codes
│   └── events.json             # Game events
├── styles/
│   ├── globals.css             # Global styles & variables
│   ├── header.css              # Header styling
│   ├── footer.css              # Footer styling
│   ├── layout.css              # Layout styles
│   ├── gamecard.css            # Game card styles
│   ├── components.css          # Pagination, sidebar, stat box
│   ├── cards.css               # Developer, code, event cards
│   └── forms.css               # Form styles
├── utils/
│   └── helpers.js              # Utility functions
├── App.jsx                     # Main app with routing
└── main.jsx                    # React entry point

index.html                      # HTML template
package.json                    # Dependencies & scripts
vite.config.js                  # Vite configuration
.gitignore                      # Git ignore file
```

## 🎨 Design Features

- **Dark Theme**: Gaming-focused dark interface with comfort for extended viewing
- **Color Scheme**: 
  - Primary Dark: `#0a0e27`
  - Secondary Dark: `#1a1f3a`
  - Accent Red: `#ff3366`
  - Accent Blue: `#0099ff`
- **Responsive**: Fully responsive on mobile, tablet, and desktop
- **CSS Only**: No CSS frameworks, pure CSS for complete control
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessible**: Semantic HTML and keyboard navigation support

## 🔧 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd reactroblox
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📊 Data Files

### games.json
Contains 50+ games with:
- Game ID, title, slug
- Developer info
- Category and tags
- Ratings and reviews
- Player counts and favorites
- Release dates

### developers.json
Contains 44+ developers with:
- Developer profiles
- Verification status
- Follower counts
- Game lists
- Establishment dates

### categories.json
Contains 16 game categories with:
- Category icons
- Descriptions
- Game counts

### codes.json
Contains 15+ active game codes with:
- Code text
- Associated game
- Rewards
- Expiration dates

### events.json
Contains 10 game events with:
- Event types
- Dates and durations
- Featured status
- Associated games

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured games |
| `/games` | Browse all games |
| `/game/:slug` | Individual game details |
| `/categories` | Browse game categories |
| `/category/:id` | Games in a category |
| `/codes` | Game codes directory |
| `/events` | Upcoming events |
| `/developers` | Browse developers |
| `/developer/:id` | Developer profile |
| `/search?q=query` | Search results |
| `/about` | About page |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `*` | 404 Not Found |

## 🔍 Search & Filter Features

- **Full-text search** across game titles, descriptions, and tags
- **Category filtering** with sidebar
- **Sorting options**:
  - Most Popular
  - Highest Rated
  - Newest
  - A-Z
- **Pagination** for browsing large result sets

## ✨ Key Components

### GameCard
Displays game information with:
- Game image and rank badge
- Rating and reviews
- Player count and favorites
- Tags
- Quick view button

### Pagination
Smart pagination with:
- Previous/Next navigation
- Page number buttons
- Current page info
- Disabled states for boundaries

### SearchBar
Search input with submit functionality for filtering games across the platform.

### Sidebar
Category filter sidebar with:
- All games option
- Category list with icons
- Active state highlighting
- Sticky positioning

## 🛠️ Utility Functions

- `formatNumber()` - Converts large numbers to K/M/B format
- `formatDate()` - Formats dates in readable format
- `generateSlug()` - Creates URL-friendly slugs
- `searchGames()` - Filters games by query
- `filterGames()` - Filters by category and rating
- `sortGames()` - Sorts by popularity, rating, etc.
- `paginateArray()` - Handles pagination logic
- `getTotalPages()` - Calculates pagination
- `getStarRating()` - Creates star display
- `copyToClipboard()` - Copies game codes
- `isEventActive()` - Checks if event is active
- `getTimeLeft()` - Displays time remaining

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Future Enhancement Ideas

- User authentication and accounts
- User ratings and reviews system
- Wishlist/favorites functionality
- Real-time game statistics
- Developer analytics dashboard
- Community forums
- Game recommendations based on preferences
- Social sharing features
- Dark/light theme toggle
- Multiple language support

## 📝 Notes

- This is a fan-made platform inspired by RobloxGo
- Not affiliated with Roblox Corporation
- All data is sample data for demonstration purposes
- The platform works completely offline with local data
- No external APIs are required

## 📄 License

This project is open source and available for educational and personal use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Contributions are welcome!

## 🚀 Deployment

To deploy this project:

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production build

3. Deploy the `dist/` folder to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any web server

## 💡 Tips

- Modify game data in `src/data/games.json` to add/remove games
- Add new categories by editing `src/data/categories.json`
- Update codes and events in their respective JSON files
- Customize colors in `src/styles/globals.css` CSS variables
- All pages work with dynamic routing - add thousands of games by just updating JSON files!

---

Made with ❤️ for the Roblox community
