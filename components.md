# Component Usage Audit

**Date:** 2026-05-03
**Checked against:** `src/pages/`, `src/sections/`, and other `src/components/` files

---

## Unused Components

These components are not imported anywhere in `src/pages/`, `src/sections/`, or other components.

| Component          | File                                               |
| ------------------ | -------------------------------------------------- |
| `AllConcerts`      | `src/components/AllConcerts.jsx`                   |
| `AllSeasonsList`   | `src/components/AllSeasonsList.jsx`                |
| `ConcertCard`      | `src/components/ConcertCard.jsx`                   |
| `HtmlParagraph`    | `src/components/HtmlParagraph.jsx`                 |
| `Icons`            | `src/components/Icons.jsx`                         |
| `PacSerWideLockup` | `src/components/PacSerWideLockup.jsx`              |
| `SeasonBlock`      | `src/components/SeasonBlock.jsx`                   |
| `SeasonComponent`  | `src/components/SeasonComponent.jsx`               |
| `MusicianCard`     | `src/components/MusicianPage/MusicianCard.jsx`     |
| `MusicianWorkItem` | `src/components/MusicianPage/MusicianWorkItem.jsx` |
| `HoverDropDown`    | `src/components/NavBar/HoverDropDown.jsx`          |
| `Season`           | `src/components/PastSeasonsPage/Season.jsx`        |

---

## Used Components

| Component                | Used By                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `CapitalizeTitle`        | `MusicianPage/MusicianWorkItem.jsx`                                                        |
| `CommissionCard`         | `src/pages/library/commissions/index.jsx`                                                  |
| `ConcertBlock`           | `PastConcerts.jsx`, `AllConcerts.jsx`, `SeasonComponent.jsx`                               |
| `CurrentSeasonBlock`     | `src/pages/schedule/index.jsx`                                                             |
| `EventCard`              | `src/sections/Landing.jsx`, `CurrentSeasonBlock.jsx`                                       |
| `Layout`                 | `src/pages/_app.js`                                                                        |
| `PacSerStackLockup`      | `src/sections/NavBar.jsx`                                                                  |
| `PastConcerts`           | `src/pages/schedule/index.jsx`                                                             |
| `PastSeasons`            | `src/pages/schedule/index.jsx`                                                             |
| `ProgramLine`            | `ConcertBlock.jsx`                                                                         |
| `StaffBioBlock`          | `src/pages/about/index.jsx`, `src/pages/about/team/index.jsx`                              |
| `StatementJeff`          | `src/pages/about/index.jsx`, `src/sections/MessageFromFounder.jsx`                         |
| `StatementMark`          | `src/pages/about/index.jsx`, `src/sections/MessageFromFounder.jsx`                         |
| `WaveBg`                 | `src/sections/NavBar.jsx`                                                                  |
| `ComposerCard`           | `src/pages/library/composers-musicians/index.jsx`, `src/pages/library/composers/index.jsx` |
| `ComposerComponent`      | `src/pages/library/composers/[composer].jsx`                                               |
| `ComposerProfileBlock`   | `ComposerPage/ComposerComponent.jsx`                                                       |
| `ComposerWorkItem`       | `ComposerPage/ComposerWorksPerformed.jsx`                                                  |
| `ComposerWorksPerformed` | `ComposerPage/ComposerComponent.jsx`                                                       |
| `MusicianComponent`      | `src/pages/library/musicians/[musician].jsx`                                               |
| `MusicianProfileBlock`   | `MusicianPage/MusicianComponent.jsx`                                                       |
| `MusicianWorksPerformed` | `MusicianPage/MusicianComponent.jsx`                                                       |
