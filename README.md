## Nishanthi — Personal Profile Website

A single-page personal website built with HTML5, CSS3 and vanilla JavaScript (ES6+). No frameworks, no build step, no package manager. Deployed with GitHub Actions to GitHub Pages.

## Sections

#hero → #journey (starts with About) → #interests → #family → #hobbies → #footer

## Project structure

```text
PersonalPortfolio/
├── index.html
├── audio/
│   └── keep-moving-forward.mp3
├── css/
│   ├── theme.css
│   └── style.css
├── images/
│   ├── about/
│   ├── hero/
│   └── interests/
├── js/
│   └── main.js
└── .github/
    └── workflows/
        ├── Deploy.yml
        ├── LightHouse.yml
        ├── Notify.yml
        ├── Pr_Checks.yml
        └── Validate.yml
```

## Run locally

Open index.html in a browser, or serve the folder:

```powershell
python -m http.server 8080
```

## Change the theme

Edit only css/theme.css. Colours, gradients, fonts, spacing, radius, max width and transition speed are all variables. Gradients are built from the colour variables, so changing --color-accent, --color-tint or --color-deep re-colours the whole page.

## Contact and soundtrack

The footer links to Nishanthi's LinkedIn, GitHub repository, and email. In the Things I Love section, click the record to play or pause `audio/keep-moving-forward.mp3`. Replace that file to use a different track.

## GitHub Actions

| Workflow | Purpose |
| --- | --- |
| Validate | HTMLHint, Stylelint, and JavaScript syntax checks |
| Deploy | Publishes to GitHub Pages when `develop` is updated |
| Pull request checks | Confirms required site files are present |
| Lighthouse | Audits performance, accessibility, and SEO |
| Notifications | Reports deployment success or failure |

### One-time setup

1. Push the repository to GitHub. The default branch is `develop`.
2. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `develop`. The site will be available at `https://<username>.github.io/<repository>/`.

## Git workflow

```bash
git checkout -b feature/short-name
git add .
git commit -m "Add family section content"
git push -u origin feature/short-name
```

Open a pull request into `develop`. The checks run automatically; merge when they pass.