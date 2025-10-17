# React Dashboard Assignment

A responsive dashboard application built with React.js that displays project statistics and data visualization through donut charts.

## Features

- Interactive donut charts showing data distribution
- Real-time statistics display
- Dropdown filters for data selection
- Responsive design
- Clean user interface

## Technologies Used

- React.js
- Tailwind CSS
- Lucide React for icons
- JavaScript ES6+

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation Steps

Clone the repository:
```bash
git clone https://github.com/keshavjuneja/react-dashboard-assignment.git
cd react-dashboard-assignment
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

The application will open at http://localhost:3000

## Project Structure
```
src/
├── App.jsx          - Main dashboard component
├── index.js         - Application entry point
├── index.css        - Tailwind CSS configuration
└── ...
```

## Dashboard Sections

**Client Section**
Displays client project status with categories: Complete, In Progress, Overdue, Incoming, and Next Follow Up.

**Project Section**
Shows project-specific statistics including Completed, In Progress, Overdue, Paid, and Next Follow Up status.

**Employee Section**
Tracks employee performance with project and employee filters.

**Statistics Cards**
Six cards showing Total Projects, Incoming, Completed, Overdue, In Progress, and Next Follow Up counts.

## Build for Production

Create production build:
```bash
npm run build
```

## Troubleshooting

If you encounter module errors, run:
```bash
npm install
```

If port 3000 is in use, specify a different port:
```bash
PORT=3001 npm start
```

## Author

Keshav Juneja
Email: keshavjuneja37@gmail.com
GitHub: github.com/keshavjuneja

## Assignment Details

Submitted for CoreTeams React Intern Position
Submission Date: October 16, 2024