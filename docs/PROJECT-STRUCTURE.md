# Project Structure

This document outlines the organized folder structure of the web project.

## Root Directory Structure

```
├── .vscode/                    # VS Code configuration
├── assets/                     # Static assets
│   ├── attached_assets/        # Attached files and media
│   ├── images/                 # Image files
│   └── portfolio_section.png   # Portfolio images
├── client/                     # Frontend React application
├── database/                   # Database related files
│   ├── migrations/             # Database schema migrations
│   ├── seeds/                  # Database seed data
│   └── *.sql                   # Various SQL scripts
├── dist/                       # Build output directory
├── docs/                       # Documentation
│   ├── analysis/               # Technical analysis documents
│   ├── guides/                 # User and admin guides
│   ├── implementation/         # Implementation documentation
│   └── *.md                    # Various documentation files
├── node_modules/               # Node.js dependencies
├── scripts/                    # Utility scripts
│   ├── setup-database.js       # Database setup script
│   └── update-project-video.js # Video update script
├── shared/                     # Shared utilities and components
├── tests/                      # Test files
│   ├── performance-test.js     # Performance testing
│   ├── test-about-values-fix.js
│   ├── test-multilanguage.js
│   ├── test-supabase-integration.js
│   └── test-translation-fix.js
└── Configuration files:
    ├── .env.example            # Environment variables template
    ├── .gitignore              # Git ignore rules
    ├── components.json         # UI components configuration
    ├── netlify.toml            # Netlify deployment config
    ├── package.json            # Node.js dependencies
    ├── postcss.config.js       # PostCSS configuration
    ├── tailwind.config.ts      # Tailwind CSS configuration
    ├── tsconfig.json           # TypeScript configuration
    └── vite.config.ts          # Vite build configuration
```

## Folder Descriptions

### `/assets/`
Contains all static assets including images, media files, and other resources used by the application.

### `/client/`
The main React frontend application with components, pages, hooks, and styling.

### `/database/`
- **migrations/**: SQL files for database schema changes
- **seeds/**: SQL files for populating database with initial data
- Root level: Various SQL scripts for specific features and updates

### `/docs/`
- **analysis/**: Technical analysis and deep-dive documents
- **guides/**: User guides, admin guides, and setup instructions
- **implementation/**: Implementation summaries, completion reports, and feature documentation
- Root level: Various documentation files including fixes, enhancements, and reports

### `/scripts/`
Utility scripts for database setup, project maintenance, and automation tasks.

### `/tests/`
Test files for various features including performance, multilanguage support, and integration testing.

## Benefits of This Organization

1. **Clear Separation**: Each type of file has its designated location
2. **Easy Navigation**: Developers can quickly find relevant files
3. **Maintainability**: Organized structure makes the project easier to maintain
4. **Scalability**: Structure supports project growth and new features
5. **Documentation**: All documentation is centralized and categorized

## Next Steps

- Consider adding README files in each major folder
- Implement consistent naming conventions
- Add folder-specific .gitignore files if needed
- Create automated scripts to maintain this organization