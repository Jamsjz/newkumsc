# KUMSC Website
## Development Documentation
- Initially install all the dependencies.
```sh
npm install
```

- This creates a folder `out` with the static website to send to the `public`
folder in cpanel.
```sh
npm run build
```

- Using FTP upload it the cpanel. or,
For development server:
```sh
npm run dev
```

## Adding a sponsor:

```json
    {
      "id": 1,
      "name": "TechSolutions Inc.",
      "logo": "https://static.vecteezy.com/system/resources/previews/047/656/219/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg",
      "tier": "platinum",
      "description": "A global technology company supporting mathematical innovation",
      "website": "https://example.com/techsolutions"
    }
```

The above should be added to src/data/sponsors.json
