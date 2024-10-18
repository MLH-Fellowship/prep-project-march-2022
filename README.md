# MLH Prep Project

Over the next 2 weeks, you'll be building a React App that works with various APIs (Application Programming Interfaces) that talk to different data sources to do cool stuff.

We're using the [OpenWeather API](https://openweathermap.org/current) to get weather data on different cities. Your challenge over the next 2 weeks is to build out this website and add even more functionality to it. At the moment, it displays basic information about a location when you type it in. Check out [Issues](/issues) for some more ideas!

You'll need to get your own API Key from their website (for free) and add it as an environment variable in a `.env` file. We have a template available as `example.env`.

You'll be using React initially to build this. If you're new to React, check out the [website](https://reactjs.org) for some information on getting started!

## Contributing Guidelines

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

**IMPORTANT**
To commit the code, we have `commitlint` and `commitizen` configured in the project along with `husky` precommit hook.

To commit, simply run:

```
yarn commit
```

### Creating a Pull Request

- Create a new branch out of the `main` branch. We follow the convention
  `[type/scope]`. For example `fix/storybook-addon` or `docs/component-api`. `type`
  can be either `docs`, `fix`, `feat`, `build`, or any other conventional
  commit type. `scope` is just a short id that describes the scope of work.

- Make and commit your changes following the commit conventions by using `yarn commit` command.

- Always `Squash and Merge` the PR after it is reviewed to the staging branch i.e. `develop` branch.

- Never merge your code or the PR directly to `main`

***
### Creating API key for Food Recommendations:
[Spoonacular API](https://spoonacular.com/food-api/docs) can be used for food recommendations </br>

- Click on 'Start Now' button to go to the signup page.
<img width="500" alt="image" src="https://user-images.githubusercontent.com/73184612/159624513-7ef7f754-e2be-46c6-9a14-6d4bc93d9821.png">

- Sign Up with email. Confirm your account by following the steps in the email sent by spoonacular
<img width="500" alt="image" src="https://user-images.githubusercontent.com/73184612/159624823-98c00147-d4b9-44c8-bd25-98290f6d5517.png">

- After confirming, log in to your account. You will automatically be subscribed to the free plan.
- Go to the profile section on the dashboard, and click on 'Show/Hide API key' button
<img width="500" alt="image" src="https://user-images.githubusercontent.com/73184612/159625250-9894be85-d265-4445-8882-c953d59225ac.png">

- Copy this API key. Create a .env file in the root of your local repository, and add the API key inside it as: <br />
REACT_APP_FOOD_API_KEY=<your_key>

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


### Creating API key to enable Spotify Feature for weather:

- Go to the [spotify](https://www.spotify.com/us/) website.

- Click on [developers](https://developer.spotify.com/)  in the footer

- Click on [dashboard](https://developer.spotify.com/dashboard/applications)  in the header.

- Click on create a new app and fill in your apps details

- Once created you'll receive a SPOTIFY CLIENT ID and SPOTIFY_SECRET

- Add these to your .env to start making requests and remember to restart the server and run the app
