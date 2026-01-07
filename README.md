# Professorwillow.me

ProfessorWillow is a web application designed to become the go-to Pokemon GO companion. Currently, it helps track live and upcoming events, discover Pokémon, and more.

### Key Features

- **Dashboard:** Brings together key areas of the site in a modern, responsive dashboard to show information a Pokemon GO player would find most useful at a glance, such as a *live events carousel*, pills for the *closest upcoming events*, a section for Pokemon with *boosted shiny rates*, and more.
- **Event Tracking:** View live, upcoming, and completed events in a clean and organized interface, including dedicated pages for each event.
- **Pokédex:** Browse all Pokemon currently in Pokemon GO with filters for Pokemon type and generation.
- **Responsive Design:** Mobile-first design and a dashboard grid that will neatly resize for all common screen types.

<hr></hr>

## Running ProfessorWillow locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/JoshHofer01/professor-willow.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running the Application

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run pokemon:index`: A custom script to process and index Pokémon data.

<hr></hr>

### Built With

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Sentry](https://sentry.io/)

### Built On

- [Hetzner](https://www.hetzner.com/)
- [Coolify](https://coolify.io/)
- [Cloudflare](https://www.cloudflare.com/en-gb/)

<hr></hr>

### Disclaimers
This project is a non-commercial, educational, and fan-made creation. It is not affiliated with, endorsed by, or connected to Nintendo, The Pokémon Company, Niantic, Scopely or any of their affiliates or partners.

ProfessorWillow is designed as a Fair Use project to become a Pokemon GO companion site. We believe professorwillow.me constitutes a fair use of any such copyrighted material as the material on this site is distributed without profit to those who have expressed a prior interest in receiving the included information for research and educational purposes.

#### APIs

- [ScrapedDuck](https://github.com/bigfoott/ScrapedDuck/): Event Data
- [pokemon-go-api](https://github.com/pokemon-go-api/pokemon-go-api): Pokemon & Pokedex Data
