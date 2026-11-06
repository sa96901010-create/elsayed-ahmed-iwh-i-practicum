const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Access token is read from the runtime environment and is never committed.
const ACCESS_TOKEN = process['env']['HUBSPOT_TOKEN'];

const CUSTOM_OBJECT_TYPE = '2-256187016';
const CUSTOM_OBJECTS_URL = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;

function apiHeaders() {
  return {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  };
}

// ROUTE 1 - Homepage: retrieve all custom object records and render them in a table.
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `${CUSTOM_OBJECTS_URL}?properties=name,species,age,bio&limit=100`,
      { headers: apiHeaders() }
    );

    res.render('homepage', {
      title: 'Pets | Integrating With HubSpot I Practicum',
      data: response.data.results
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Unable to load custom object records.');
  }
});

// ROUTE 2 - Render the form used to create a new custom object record.
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
  });
});

// ROUTE 3 - Create a new custom object record from the submitted form data.
app.post('/update-cobj', async (req, res) => {
  try {
    const { name, species, age, bio } = req.body;

    await axios.post(
      CUSTOM_OBJECTS_URL,
      { properties: { name, species, age, bio } },
      { headers: apiHeaders() }
    );

    res.redirect('/');
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Unable to create the custom object record.');
  }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
