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

## For Admins

### Content Management

### Events

-   **Add the event markdown file:**
    Create a new `.md` file in the `src/content/events` directory. The filename should follow the pattern `event-XXX.md`, where `XXX` is the event number.

-   **Add the event frontmatter:**
    The following frontmatter fields are available for events:

    ```yaml
    ---
    title: "Event Title"
    date: "YYYY-MM-DD" # For single-day events
    from: "YYYY-MM-DD" # For multi-day events
    to: "YYYY-MM-DD" # For multi-day events
    slug: "event-slug" # Should be unique
    banner: "/images/events/banner.jpg"
    description: "A short description of the event."
    category: "Event Category"
    form: "https://forms.gle/..." # Optional
    location: "Event Location" # Optional
    ---

    **Note:** The `slug` should be unique.

### Notices

-   **Add the notice markdown file:**
    Create a new `.md` file in the `src/content/notices` directory. The filename should follow the pattern `notice-XXX.md`, where `XXX` is the notice number.

-   **Add the notice frontmatter:**
    The following frontmatter fields are available for notices:

    ```yaml
    ---
    title: "Notice Title"
    date: "YYYY-MM-DD"
    description: "A short description of the notice."
    banner: "/images/notices/banner.webp"
    slug: "notice-slug" # Should be unique
    category: "Notice Category"
    tags: ["tag1", "tag2"]
    form: "https://forms.gle/..." # Optional
    ---
    ```

    **Note:** The `slug` should be unique.

### Sponsors

1.  **Add the sponsor data:**
    Add a new entry to the `src/data/sponsors.json` file with the following structure:

    ```json
    {
      "id": 1,
      "name": "TechSolutions Inc.",
      "logo": "/images/sponsors/sponsor-XXX.png",
      "tier": "platinum",
      "description": "A global technology company supporting mathematical innovation",
      "website": "https://example.com/techsolutions"
    }
    ```

    **Note:** The `tier` can be `platinum`, `gold`, `silver`, or `bronze`.

2.  **Add the sponsor image:**
    Place the sponsor image in the `public/images/sponsors` directory.

### Committee Members

1.  **Add the member data:**
    Add a new entry to the `src/data/leadership.json` file with the following structure:

    ```json
    {
      "id": 1,
      "name": "Full Name",
      "position": "Position",
      "image": "/images/Committe/member-XXX.jpg",
      "socials": {
        "facebook": "https://www.facebook.com/",
        "instagram": "https://www.instagram.com/",
        "linkedin": "https://www.linkedin.com/",
        "github": "https://github.com/"
      }
    }
    ```

2.  **Add the member image:**
    Place the member image in the `public/images/Committe` directory.

### Publications

1.  **Add the publication data:**
    Add a new entry to the `src/data/publications.json` file with the following structure:

    ```json
    {
      "id": 1,
      "title": "Publication Title",
      "description": "Publication Description",
      "image": "/images/publications/publication-XXX.jpg",
      "url": "/publications/publication-XXX.pdf"
    }
    ```

2.  **Add the publication image:**
    Place the publication image in the `public/images/publications` directory.

3.  **Add the publication file:**
    Place the publication file (e.g., PDF) in the `public/publications` directory.

### Perspectives

1.  **Add the perspective data:**
    Add a new entry to the `src/data/perspectives.json` file with the following structure:

    ```json
    {
      "id": 1,
      "name": "Full Name",
      "message": "Perspective Message",
      "image": "/images/perspectives/perspective-XXX.jpg",
      "position": "Position"
    }
    ```

2.  **Add the perspective image:**
    Place the perspective image in the `public/images/perspectives` directory.

### Alumni

1.  **Add the alumni data:**
    Add a new entry to the `src/data/alumni.json` file with the following structure:

    ```json
    {
      "id": 1,
      "name": "Full Name",
      "batch": "Batch Year",
      "image": "/images/alumni/alumni-XXX.jpg",
      "position": "Current Position",
      "socials": {
        "facebook": "https://www.facebook.com/",
        "instagram": "https://www.instagram.com/",
        "linkedin": "https://www.linkedin.com/",
        "github": "https://github.com/"
      }
    }
    ```

2.  **Add the alumni image:**
    Place the alumni image in the `public/images/alumni` directory.

### Gallery

1.  **Add the gallery image data:**
    Add a new entry to the `src/data/gallery.json` file with the following structure:

    ```json
    {
      "id": 1,
      "title": "Image Title",
      "image": "/images/gallery/gallery-XXX.jpg"
    }
    ```

2.  **Add the gallery image:**
    Place the gallery image in the `public/images/gallery` directory.

### Club Info

1.  **Add the club info data:**
    Add a new entry to the `src/data/clubInfo.json` file with the following structure:

    ```json
    {
      "name": "Club Name",
      "description": "Club Description",
      "email": "club@email.com",
      "socials": {
        "facebook": "https://www.facebook.com/",
        "instagram": "https://www.instagram.com/",
        "linkedin": "https://www.linkedin.com/",
        "github": "https://github.com/"
      }
    }
    ```

    **Note:** The `clubInfo.json` file should only contain one object.

### Updating the Club Logo

1.  **Replace the logo file:**
    Replace the `logo.svg` file in the `public/images` directory with the new logo file. The new file should also be named `logo.svg`.

### Updating the Club Banner

1.  **Replace the banner file:**
    Replace the `banner.jpeg` file in the `public/images` directory with the new banner file. The new file should also be named `banner.jpeg`.
