# MLH Prep Project

Over the next 2 weeks, you'll be building a React App that works with various APIs (Application Programming Interfaces) that talk to different data sources to do cool stuff.

We're using the [OpenWeather API](https://openweathermap.org/current) to get weather data on different cities. Your challenge over the next 2 weeks is to build out this website and add even more functionality to it. At the moment, it displays basic information about a location when you type it in. Check out [Issues](/issues) for some more ideas!

You'll need to get your own API Key from their website (for free) and add it as an environment variable in a `.env` file. We have a template available as `example.env`.

You'll be using React initially to build this. If you're new to React, check out the [website](https://reactjs.org) for some information on getting started!

### Creating API key to enable Auto-Complete Feature for Cities:

- Go to the [Manage resources](https://console.cloud.google.com/cloud-resource-manager) page in the Cloud Console.

- Click Create Project.

- In the New Project window that appears, enter a project name. A project name can contain only letters, numbers, single quotes, hyphens, spaces, or exclamation points, and must be between 4 and 30 characters.

- When you're finished entering new project details, click Create.

- Go to the [Google Maps Platform > Credentials page](https://console.cloud.google.com/google/maps-apis/credentials) and make sure you have selected the appropriate Project.

- On the Credentials page, click Create credentials > API key.
The API key created dialog displays your newly created API key.

- Copy this API key. Create a .env file in the root of your local repository, and add the API key inside it as: <br />
  REACT_APP_GOOGLE_MAPS_PLACES_API_KEY=<your_key>

- Now go to [API](https://console.cloud.google.com/google/maps-apis/api-list).

- Click on Places API and enable it.

- Similarly Click on Maps JavaScript API and enable it.

- Now go to [billing Section](https://console.cloud.google.com/billing) and link a billing account, do not worry it is free of cost.

- Restart the terminal and run the app.
