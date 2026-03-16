# Language Games Micro Frontend

This micro frontend contains all language learning games for Turkish and English, organized by grade level (1-8).

## Structure

```
src/
├── games/
│   ├── turkish/
│   │   ├── grade1/    # Letters, syllables, words, reading
│   │   ├── grade2/    # Reading, writing, grammar, vocabulary
│   │   ├── grade3/    # Advanced Turkish games
│   │   ├── grade4/
│   │   ├── grade5/
│   │   ├── grade6/
│   │   ├── grade7/
│   │   └── grade8/
│   └── english/
│       ├── grade1/    # Basic English games
│       ├── grade2/
│       ├── grade3/
│       ├── grade4/
│       ├── grade5/
│       ├── grade6/
│       ├── grade7/
│       └── grade8/
├── components/        # Shared language game components
├── hooks/             # Custom hooks for language games
└── types/             # TypeScript types
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 5003)
npm run dev

# Build for production
npm run build
```

## Package Name

`@egitim-galaksisi/language-games`
