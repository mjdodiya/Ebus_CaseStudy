# Udaipur Bus — UI/UX Design Case Study

A responsive, static case-study website built with semantic HTML, CSS and vanilla JavaScript. The screenshots and app recording in `assets/` are the supplied project materials; the page distinguishes the UI/UX design contribution from the developer's implementation work.

## Run locally

Open `index.html` in a browser. For a local HTTP server, run `npx serve .` from this folder, then open the URL it prints. There are no build steps or project dependencies.

## Deploy to Netlify

1. Put the project files, including the `assets/` folder, in a Git repository or upload the project folder to Netlify.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository, or use **Deploy manually** to upload the folder.
3. Leave the build command empty and set the publish directory to `.` (the project root).
4. Deploy. The site uses relative asset paths and does not require server-side configuration.

## Before publishing

- Replace the example Portfolio, LinkedIn and email URLs in `index.html` with your own.
- Update the Open Graph image and metadata if you add a dedicated share-card image or production domain.
- The screenshots are presented as supplied. The included app recording is loaded only when playback is requested (`preload="none"`).
