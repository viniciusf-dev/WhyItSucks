# 🚀 WhyItSucks 

<div align="center">
  <img src="https://github.com/user-attachments/assets/e9702b30-e403-4f50-bbfd-84fb0bd67f21"></img>
  <img width="100" height="130" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWl6YWVobjBjcjNmc2pzZm42ZzZ3d3I5cHpzM210dTRvY2xma21jOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdvdir0afC6brCCs/giphy.gif"></img>
  <h3>The AI-Powered Negative Game Review Analyzer</h3>
</div>

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v3/monitor/1kmif.svg)](https://uptime.betterstack.com/?utm_source=status_badge)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/viniciusf-dev/WhyItSucks/main)
![Website](https://img.shields.io/website?up_message=online&up_color=green&down_message=offline&down_color=red&url=https://why-it-sucks.vercel.app/)

![Static Badge](https://img.shields.io/badge/nextjs-white?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=black&color=white)
![Static Badge](https://img.shields.io/badge/typescript-%2306B6D4?style=for-the-badge&logo=typescript&labelColor=white&color=%233178C6)
![Static Badge](https://img.shields.io/badge/tailwindcss-%2306B6D4?style=for-the-badge&logo=tailwindcss&labelColor=black&color=%2306B6D4)

## About WhyItSucks

WhyItSucks is an open-source platform that uses AI to analyze negative video game reviews, providing gamers with detailed insights about potential issues before making a purchase. By scraping and processing thousands of negative reviews from Steam and other platforms, our tool identifies common complaints, bugs, and problems that might affect your gaming experience.

## Why We Built This

Too often, gamers spend money on hyped titles only to find them plagued with bugs, performance issues, or gameplay problems that weren't apparent from professional reviews or marketing materials.

WhyItSucks gives you the other side of the story - what real players are complaining about - so you can decide if those issues would affect your enjoyment of the game.

**We're not here to tell you not to buy a game - we're here to make sure you know what you're getting into!**

## Features

- **Identify Issues**: Discover the most common problems players experience with any game
- **Save Time & Money**: Know what you're getting into before buying a disappointing game
- **AI Analysis**: Our algorithm categorizes and prioritizes the most relevant issues

## How It Works

1. **Search**: Enter the name of any video game you're interested in. Our system will check if we already have data for it, or initiate a new analysis.

2. **Collect**: Our systems scrape thousands of negative reviews from Steam and other platforms, focusing specifically on complaints and problems.

3. **Analyze**: Our AI processes all reviews, identifying common themes, categorizing problems, and determining the severity of each issue based on frequency and impact.

4. **Results**: We present a comprehensive breakdown of the game's issues, including:
   - Problem severity score
   - Categorized problems (Bugs, Performance, Gameplay, Design, Story)
   - Specific top complaints mentioned by players

## Example Analysis

When analyzing a game like Elden Ring, the system might identify issues such as:

- Game crashes and performance issues (PC)
- Frustrating boss fight mechanics (poorly telegraphed attacks, unfair hitboxes)
- Numerous game-breaking bugs
- Sparse open world with repetitive content
- Lackluster story

Each problem is categorized and given a severity rating based on how frequently it appears in reviews.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/whyitsucks.git

# Navigate to the project directory
cd whyitsucks

# Install dependencies
npm install

# Build the development server that is equivalent to production
npm run build

# Start running the server
npm run start
```

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Tech Stack

- Frontend: NextJs, Typescript
- Backend: Node.js
- Database: MongoDB
- AI: Gemini Model (Gemini-Flash-1.5)
- Data Collection: We have a database that is weekly updated with Steam API

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the frustrated gamers whose reviews make this analysis possible
- The open-source community for their invaluable tools and libraries
- Coffee for fueling late-night debugging sessions

---

<div align="center">
  <p>© 2025 WhyItSucks</p>
  <p>Made with ❤️ for gamers by gamers</p>
</div>
