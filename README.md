# React Weather - Daily Weather Forecast App

<div align="center">
  <img src="https://img.shields.io/badge/React-17.0.2-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-4.1.5-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux" alt="Redux Toolkit">
</div>

## 🌍 Demo

Experience React Weather in action:

- **Live Demo**: [react-weather](https://andrey-golubenko.github.io/react-weather/)

## 📌 Core Features

- **Location-based weather detection**
  - Automatic city detection based on user's IP
  - Manual city search with autocomplete
- **Comprehensive weather information**
  - Current temperature
  - Min/Max temperature
  - Humidity levels
  - Wind speed
  - Atmospheric pressure
- **Dynamic weather visualization**
  - Weather condition icons
  - Temperature graphs
- **Multi-city management**
  - Add multiple cities
  - Remove cities
  - Update weather data
- **Temperature unit conversion**
  - Celsius/Fahrenheit toggle
- **24-hour forecast**
  - Detailed hourly weather data
  - Temperature trends

## 🛠️ Project Features

### ➤ Integration with External Services

- **[OpenWeatherMap](https://openweathermap.org/)** - Weather data provider
  - Current weather conditions
  - Hourly forecasts
  - Weather icons and descriptions
- **[IPInfo](https://ipinfo.io/)** - Location detection service
  - City detection based on IP
- **[HERE Maps](https://www.here.com/)** - Location autocomplete
  - City search suggestions
  - Geographic data validation

### ➤ Technology Stack

- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management
- **[React Router](https://reactrouter.com/)** - Navigation
- **[Materialize CSS](https://materializecss.com/)** - Styling framework
- **[Weather Icons](https://erikflowers.github.io/weather-icons/)** - Weather icon font

## 🔧 Required Environment Variables

Create a `.env.local` file in the root directory:

```bash
REACT_APP_API_KEY="your_openweathermap_api_key"
REACT_APP_LOCATION_API_KEY="your_ipinfo_api_key"
REACT_APP_AUTO_COMPLETE_API_KEY="your_here_api_key"
```

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/your-username/react-weather.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Start development server:
```bash
npm start
```

5. Build for production:
```bash
npm run build
```

## 📂 Project Structure

```plaintext
react-weather/
├── src/
│   ├── app/                # Redux store configuration
│   │   ├── hooks.ts        # Custom Redux hooks
│   │   ├── store.ts        # Store setup
│   │   └── weatherSlice.ts # Weather state management
│   ├── components/         # React components
│   │   ├── Alert/          # Error notifications
│   │   ├── Success/        # Success notifications
│   │   ├── Warning/        # Warning notifications
│   │   └── ...            # Other UI components
│   ├── pages/             # Route components
│   │   ├── Home.tsx       # Main weather display
│   │   ├── SingleCityList # Detailed city forecast
│   │   └── NotFound.tsx   # 404 page
│   ├── utils/             # Helper functions
│   │   ├── fetchDataLocation.ts
│   │   ├── getWeatherDate.ts
│   │   └── iconsMark.ts   # Weather icon mapping
│   └── interfaces.ts      # TypeScript interfaces
├── public/               # Static assets
└── package.json         # Project dependencies
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
