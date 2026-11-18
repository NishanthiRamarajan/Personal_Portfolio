## Nishanthi — Personal Profile Website

A single-page personal website built with HTML5, CSS3 and vanilla JavaScript (ES6+). No frameworks, no build step, no package manager. Deployed with GitHub Actions to GitHub Pages.

## Sections

#hero → #journey (starts with About) → #interests → #family → #hobbies → #footer

## Project structure
profile-website/
├── index.html
├── css/
│   ├── theme.css      # every colour, gradient, font, spacing and motion token
│   └── style.css      # layout and components (reads theme.css only)
├── js/main.js         # navigation, reveal, timeline, flip cards, lightbox
├── images/{hero,about,journey,interests,family,hobbies}/
├── .github/workflows/ # validate, deploy, pr-checks, lighthouse, notify
├── .htmlhintrc
├── .gitignore
└── README.md
Run locally

Open index.html in a browser, or serve the folder:

bash
python3 -m http.server 8080
Change the theme

Edit only css/theme.css. Colours, gradients, fonts, spacing, radius, max width and transition speed are all variables. Gradients are built from the colour variables, so changing --color-accent, --color-tint or --color-deep re-colours the whole page.

Replace the placeholders
Family and Hobbies text and photos are marked [Placeholder] in index.html.
Footer links: replace YOUR-USERNAME (LinkedIn, GitHub) and your-email@example.com.

## GitHub Actions
Workflow	File	Purpose
Validate HTML and CSS	validate.yml	HTMLHint, Stylelint, JS syntax check
Deploy	deploy.yml	Publishes to GitHub Pages on every push to main
Pull request checks	pr-checks.yml	Required files, anchors, image paths, no hard-coded colours
Lighthouse audit	lighthouse.yml	Performance, accessibility, SEO scores
Notifications	notify.yml	Success summary, or an issue if deployment fails
One-time setup
Push the repository to GitHub (default branch main).
Settings → Pages → Build and deployment → Source: GitHub Actions.
Push to main. The site appears at https://<username>.github.io/<repository>/.

## Git workflow
bash
git checkout -b feature/short-name
git add .
git commit -m "Add family section content"
git push -u origin feature/short-name

Open a pull request into main. The checks run automatically; merge when they pass.