# Solid Profile Viewer

A clean, responsive Solid profile viewer that fetches and displays user information from any public Solid WebID. Built to demonstrate frontend skills, good UX/UI design, and proper handling of Solid data.

---

## Features

- **Load profiles dynamically**: Pass a WebID as a query parameter to load that profile.  
  Example:  
index.html?webid=https://timbl.solidcommunity.net/profile/card#me

- **Default profile**: Loads Sir Tim Berners-Lee’s profile if no WebID is provided.
- **Profile details**:
- Large profile image
- Full name of the user
- Contacts with profile images or default human icons
- Contact URLs are visible and clickable
- **Responsive layout**: Works on mobile, tablets, and desktops
- **Handles multiple contacts** without overflow
- **Smooth animations**: Loading spinner and fade-in effects
- **Clean UI/UX design** using Tailwind CSS

---

## How to Use

1. Open `index.html` in your browser.
2. Add a WebID as a query parameter, e.g.:  
index.html?webid=https://timbl.solidcommunity.net/profile/card#me

3. Leave the WebID empty to load Tim Berners-Lee’s default profile.

---

## Contacts Section

- Displays **profile pictures** if available.
- Uses a **default human icon** for contacts without a picture.
- URLs of contacts are **clickable** and clearly visible.
- Cards are **responsive** and adapt to different screen sizes, avoiding overflow even with many contacts.

---

## Libraries and Tools

- [rdflib.js](http://linkeddata.github.io/rdflib.js/doc/) – for fetching and parsing Solid profiles (RDF / Turtle / JSON-LD)
- [Tailwind CSS](https://tailwindcss.com/) – for responsive styling and layout
- Vanilla JavaScript for DOM manipulation and profile handling

---

## Deployment

You can host this project using:

- **GitHub Pages**
- **Netlify**
- **Vercel**

Example live link:  


https://your-username.github.io/solid-profile-viewer/


---

## Notes

- Only works with **public WebIDs**.
- Only machine-readable content (Turtle or JSON-LD) is parsed.
- No authentication or private data handling is included.
- Focus is on **frontend functionality**, clean code, and professional UI/UX.

---

## Submission

- Provide the **GitHub repository link** with all project files.
- Provide a **live deployment link** for easy testing.
- Ensure the project is **fully responsive** and accessible.

---

## Author

**Aishwarya John Pole Madhu**  
Front-End Developer Applicant – Open Data Institute  
Email: aishwaryajohnpolemadhu@gmail.com