# Authenticator Companion website

English landing page for the unofficial [Authenticator Companion for Google Authenticator™](https://github.com/edibudimilic/Authenticator-Companion-for-Google-Authenticator) Chrome extension.

Live: https://google-auth-for-chrome.exevio.com

## Development

Plain HTML, CSS and JavaScript. No packages, external fonts, analytics or build step. Serve this folder with any static HTTP server, for example `python -m http.server 8766`. The interactive demo uses fixed illustrative values and never reads real authentication data.

The Chrome Web Store button points to item `bmajakgokepceocggcfemcepnjkknpoi`. Version 1.0.0 is published publicly, as confirmed in the publisher dashboard on 17 November 2026.

## Deployment

Hosted through DeployMonster in the Exevio workspace. `.deploymonster.json` records the verified project and local deployment revision. Deploy only `index.html`, `privacy.html`, `style.css`, `app.js`, and `assets/`; never publish Git metadata or the deployment locator.

DNS A and verification TXT records were added through DigitalOcean MCP. At deployment time, exevio.com was delegated to Stellar nameservers, so the same records were also added to its authoritative WHM zone. DigitalOcean's copy alone is not authoritative.

## License

MIT. Google Authenticator is a trademark of Google LLC. This project is independent and unofficial.
