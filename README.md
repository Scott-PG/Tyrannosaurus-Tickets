# Tyrannosaurus-Tickets

![Logo](/client/src/assets/t-rex-line.png)

## Deployed App

[Mobile App](https://t-rex-tickets.netlify.com) - (Demo Account > username: __user1__, password: __123456__)

[QR Scanner App](https://trex-tickets-qr-reader.surge.sh/)

## Team Members

Andrew Hsu: Back-End Developer [site](https://drewhsu86.com/)

Jordan Weiss: Data Scientist [site](https://www.linkedin.com/in/jordan-weiss-a54bb826/)

Leah Mirani: UX Designer [site](https://www.leahmiranidesign.com/)

Peter Hsiao: UX Designer [site](https://www.peterhsiao.me/)

Scott Griffith: Front-End Developer [site](https://scottgriffith.dev/)
## Overview

### Overall Summary

T-Rex Tickets was built from the prompt "How do you design a contactless ticket app that can keep people safe in a pandemic?"

We built T-Rex Tickets as a full-stack system, with a server to contain event and ticket data, a user app to recall event and ticket data for events that you have tickets to, and a personnel app that can scan and decrypt tickets in an event setting.  We designed this to be platform agnostic, especially for the reader app; one thing the pandemic has taught us is a need for flexibility.  The reader app can be placed in a socially distanced webcam, allowing attendants to keep a safe distance in a socially distanced setting.  We also focused on mobile-first architecture as a ticket-storage app has the most use on mobile devices.

## Backend

### Backend Summary

The backend for Tyrannosaurus Tickets is designed to be a REST api that runs on Expressjs and Mongodb. The role of the backend is to hold data for **Users**, **Events** and **Tickets**. Users can sign up, sign in and verify using a JWT. Events hold data relevant to a real life event where a User can get tickets for. Tickets are what a User needs to enter the Event and holds an encrypted string that is used to generate a QR code. The QR code is generated from this string on the frontend, which can then be scanned while attending the event.

The reason Express is used instead of a framework such as Ruby on Rails is that, while Ruby on Rails can easily scaffold applications where the typical CRUD functionality is required, Express is very lightweight and allows us to quickly prototype backend functionality and routes and only code in what we need.

Following a similar train of thought, Mongodb was chosen as the database so that flexible Schemas can be developed for the prototype quickly. A relational database could've been used, but join tables would have been required instead of arrays. Depending on the expected scale of a final product, relational databases could've been considered as well.

### Dependencies

- bcrypt
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- morgan

### Entity Relationship Diagram (ERD)

![ERD Diagram](/readme/ERD1.png)

### Routes

- Note: A minimum number of routes were developed to demo this app. A more full implementation of this app would likely feature full CRUD for Events and Tickets.

##### User Routes

- POST /signup - sign up for an account, get JWT back
  - req.body: { username, user_real_name, password }
- POST /signin - sign in to an account, get JWT back
  - req.body { username, password }
- GET /verifyuser - having JWT in header, get user info back
  - headers { Authorization: Bearer -JWT here- }

##### Event Routes

- GET /events - do not need to be logged in, get array of events back with ticket information hidden
- GET /userevents - need to have valid JWT, get array of events back that this user has at lesat one ticket for
- GET /userevents/:id - if valid JWT, get event back with ticket(s) info as a key/value pair. if no valid JWT, get event back with ticket info hidden

##### Ticket Routes

- POST /decryptticket - send an encrypted QR code from our app and get the corresponding ticket info back
  - req.body { encrypted_qr_code }
- POST /generateticket - need to have valid JWT, send event_ID and name_on_ticket to generate a ticket for corresponding event and user
  - req.body { event_ID, name_on_ticket }

## Frontend

### Frontend Summary

The Frontend App is designed to pull ticket and event data from the backend and present it in a user-friendly way. In addition, options are locked based on the logged-in status of the user. QR codes are generated from encrypted strings on the front-end, saving network bandwidth in a data-congested setting.

Tickets are stored in a wallet and all viewable information is based on JavaScript Web Tokens, making it impossible to see data that doesn't pertain to you.

#### Packages Used on Front-End

- qrcode.react

- axios

- bootstrap

- react-responsive-carousel

- react-router-dom

#### React Component Structure

![React Component Diagram](/readme/T-Rex-Tickets-React.png)

### Frontend (QR-reader) Summary 

In the client-qr-reader folder, a separate React app is made for the sole purpose of reading QR codes, and sending the decoded string to the backend through the route '/api/decryptticket'. As it only has a single component as a child of App.js, no component tree is needed.

#### Packages Used on QR-reader 

- axios 

- react-qr-reader
