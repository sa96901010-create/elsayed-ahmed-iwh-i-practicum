# ElSayed Ahmed - Integrating With HubSpot I: Foundations Practicum

Custom object: **Pets**

Custom object list view:

https://app.hubspot.com/contacts/149717692/objects/2-256187016/views/all/list

## Project overview

A small Express application that uses Axios to call the HubSpot CRM API and Pug to render the custom object records.

- `GET /` - lists every Pet record in an HTML table.
- `GET /update-cobj` - renders the form used to create a new Pet.
- `POST /update-cobj` - creates a Pet record in HubSpot and redirects to the homepage.

## Setup

1. Run `npm install`.
2. Set the `HUBSPOT_TOKEN` environment variable to a private app access token with these scopes:
   - `crm.schemas.custom` (read/write)
   - `crm.objects.custom` (read/write)
   - `crm.objects.contacts` (read/write)
3. Run `node index.js`.
4. Open `http://localhost:3000`.

The access token is never stored in this repository.
