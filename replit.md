# Overview

This is a full-stack Image to PDF Converter web application built with React and Express. The app allows users to select multiple images, reorder them through drag-and-drop functionality, and convert them into a single PDF document. The application features a modern interface built with Shadcn/UI components and Tailwind CSS, providing both light and dark theme support. The app processes images entirely on the client-side for privacy, using jsPDF for PDF generation without requiring server-side processing.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 19 with TypeScript for type safety and modern development experience
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/UI component library with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS for utility-first styling with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management and local React state for UI state
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for the API server
- **Development Setup**: Full-stack development with Vite integration for hot module replacement
- **Session Storage**: In-memory storage implementation with interface for future database integration
- **API Structure**: RESTful API design with centralized route registration

## Data Layer
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Centralized schema definition in shared directory with Zod validation
- **Migrations**: Automated database migrations through Drizzle Kit

## Client-Side Processing
- **PDF Generation**: jsPDF library loaded from CDN for client-side PDF creation
- **Image Handling**: Browser-native File API for image processing and preview generation
- **Drag & Drop**: Native HTML5 drag-and-drop API for image reordering functionality

## Development Experience
- **Type Safety**: Comprehensive TypeScript configuration across client, server, and shared code
- **Code Quality**: ESBuild for production bundling with tree-shaking and optimization
- **Development Tools**: Hot reload, error overlay, and development banner for enhanced DX

# External Dependencies

## Core Libraries
- **React Ecosystem**: React 19, React DOM, React Query for UI and state management
- **Backend Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with Neon Database (PostgreSQL) and connection pooling

## UI and Styling
- **Component Library**: Radix UI primitives for accessible base components
- **Design System**: Shadcn/UI for pre-built component patterns
- **CSS Framework**: Tailwind CSS with PostCSS for processing
- **Icons**: Lucide React for consistent iconography

## Development Tools
- **Build System**: Vite with React plugin for fast development and builds
- **Type Checking**: TypeScript with strict configuration
- **PDF Processing**: jsPDF library for client-side PDF generation
- **Validation**: Zod for runtime type validation and schema generation

## Authentication & Session Management
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Password Hashing**: Configured for secure user authentication (implementation ready)

## AI Integration
- **Google Generative AI**: Integration ready for potential AI-powered features
- **Date Utilities**: date-fns for date manipulation and formatting

## Production Deployment
- **Process Management**: Node.js with ES modules support
- **Static Assets**: Served through Express with Vite-built frontend
- **Environment**: Production and development environment configurations