# Pacific Serenades Website

## Description

This is the Pacific Serenades's new website built in 2024. The original website was built on WordPress and due to lack of maintenance since 2016, it has become unmanageable. This website is built with:

- nextjs
- nextui
- tailwind
- framer-motion

## Data Extraction

A carbon copy of the old website has been archived.
Repo: <https://github.com/hojoon0724/pac-ser-2016>
Deployed: <https://hojoon0724.github.io/pac-ser-2016/>

Data has been extracted from html files of these categories:

- seasons
- concerts
- composers
- musicians
- works
- venues
- premieres

Extraction was done with nodejs using regex matching.
Files can be found in /workshop.
All extractions have been compiled into json files.
Some data has been consolidated to reduce repetitions.

## Data Structure

Data with large amounts of entries have been separated into individual files in their respective folders.

### Seasons

Build data: `/data/allSeasons.json`
Individual entries: `n/a`

```json
{
  "YYYY Season": [ concertId, concertId, ... ],
  "YYYY Season": [ concertId ],
  ...,
}
```

### Concerts

Build data: `/data/allConcerts.json`
Individual entries: `/data/concerts/[yyyy]/[concertName].json`
Structure:

```json
{
  "concertId": {
    "id": str,
    "year": str,
    "concertTitle": str,
    "dates": [
      {
        "date": str(ISO 8601),
        "time": str,
        "venue": str, <--- redundancy
        "venueId": venue.id,
      },
      ...
    ],
    "program": [ workId, workId, workId,... ]
  }
}
```

### Composers

Build data: `/data/allComposers.json`
Individual entries: `/data/composers/[composerName].json`

```json
{
  "composerId": {
    "id": str,
    "fullName": str, <---- redundancy
    "firstName": str,
    "lastName": str,
    "born": str,
    "died": str,
    "website": str,
    "photo": str(/photos/composerId.jpg),
    "bio": html(<p>A graduate of UCLA in...),
  },
  ...
}
```

### Musicians

Build data: `/data/allMusicians.json`
Individual entries: `/data/musicians/[musicianName].json`

```json
{
  "musicianId": {
    "id": str,
    "fullName": str, <---- redundancy
    "firstName": str,
    "lastName": str,
    "instrument": str,
    "website": str,
    "photo": str(/photos/composerId.jpg),
    "bio": html(<p>A graduate of UCLA in...),
  },
  ...
}
```

### Works

Build data: `/data/allWorks.json`
Individual entries: `/data/works/[workName].json`

```json
 {
  "workId": {
    "id": str,
    "workName": str,
    "workYear": str,
    "workComposer": composer.id,
    "instrumentation": str,
    "commissionedBy": str,
    "purchaseLink": str,
    "video": [
      [ url, label],
      [ url, label],
      ...
    ],
    "audio": [
      [ fileName, label],
      [ fileName, label],
      ...
    ],
    "description": html(<p>Jesu soll mein erstes wo...),
  },
  ...
 }
```
