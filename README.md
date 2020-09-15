# Backend and Frontend Template

Latest version: https://git.ita.chalmers.se/courses/dit341/group-00-web (public Github [mirror](https://github.com/dit341/group-00-web))

## Project Structure

| File        | Purpose           | What you do?  |
| ------------- | ------------- | ----- |
| `server/` | Backend server code | All your server code |
| [server/README.md](server/README.md) | Everything about the server | **READ ME** carefully! |
| `client/` | Frontend client code | All your client code |
| [client/README.md](client/README.md) | Everything about the client | **READ ME** carefully! |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Free online production deployment | Deploy your app online in production mode |
| [docs/LOCAL_DEPLOYMENT.md](docs/LOCAL_DEPLOYMENT.md) | Local production deployment | Deploy your app local in production mode |

## Requirements

The version numbers in brackets indicate the tested versions but feel free to use more recent versions.
You can also use alternative tools if you know how to configure them (e.g., Firefox instead of Chrome).

* [Git](https://git-scm.com/) (v2) => [installation instructions](https://www.atlassian.com/git/tutorials/install-git)
  * [Add your Git username and set your email](https://docs.gitlab.com/ce/gitlab-basics/start-using-git.html#add-your-git-username-and-set-your-email)
    * `git config --global user.name "YOUR_USERNAME"` => check `git config --global user.name`
    * `git config --global user.email "email@example.com"` => check `git config --global user.email`
  * > **Windows users**: We recommend to use the [Git Bash](https://www.atlassian.com/git/tutorials/git-bash) shell from your Git installation or the Bash shell from the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run all shell commands for this project.
* [Chalmers GitLab](https://git.ita.chalmers.se/) => Login with your **Chalmers CID** choosing "Sign in with" **Chalmers Login**. (contact [support@chalmers.se](mailto:support@chalmers.se) if you don't have one)
  * DIT341 course group: https://git.ita.chalmers.se/courses/dit341
  * [Setup SSH key with Gitlab](https://docs.gitlab.com/ee/ssh/)
    * Create an SSH key pair `ssh-keygen -t ed25519 -C "email@example.com"` (skip if you already have one)
    * Add your public SSH key to your Gitlab profile under https://git.ita.chalmers.se/profile/keys
    * Make sure the email you use to commit is registered under https://git.ita.chalmers.se/profile/emails
  * Checkout the [Backend-Frontend](https://git.ita.chalmers.se/courses/dit341/group-00-web) template `git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git`
* [Server Requirements](./server/README.md#Requirements)
* [Client Requirements](./client/README.md#Requirements)

## Getting started

```bash
# Clone repository
git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git

# Change into the directory
cd group-00-web

# Setup backend
cd server && npm install
npm run dev

# Setup frontend
cd client && npm install
npm run serve

# Setup app concurrently
npm run setup (same as npm install, but for both server and client concurrently)
npm run fix (runs npm audit fix on both server and client concurrently)
npm run start (starts server and client concurrently)
```

> Check out the detailed instructions for [backend](./server/README.md) and [frontend](./client/README.md).

## Visual Studio Code (VSCode)

Open the `server` and `client` in separate VSCode workspaces or open the combined [backend-frontend.code-workspace](./backend-frontend.code-workspace). Otherwise, workspace-specific settings don't work properly.

## System Definition (MS0)

### Purpose

Yummy is a social media platform for recipes and ingredients, with user driven content. The functionalities of this platform can be accessed through a MEVN web application, where the end-user can create, change, and share ingredients and recipes, as well as create and update shopping lists to help with their baking and cooking.

The goals of the end-users of this system are to get inspiration for what to eat - by viewing recipes posted by other users, as well as storing, maintaining, and sharing their own favourite recipes.


### Pages

* **1 Landing page:**
This page displays highlights of popular recipes, like a featured items page. The user can sort the displayed recipes through popularity or date published.
* **2 Profile page:**
This page displays the users personal profile as it is seen by other users.
    * **2.1 User settings page:**
This page displays editable user settings. These include avatar image, email address and name.
* **3 My recipes page:**
This page displays a list of all the end users existing recipes, along with an option to click on a recipe to view it individually, or add a new recipe.
* **4 Add new recipe page:**
This page lets a user create a new recipe to be published on our platform, which includes features to write instructions on how to prepare said recipe, a general description of what the recipe is and add ingredients to it.
* **5 Add new ingredient page:**
This page lets the user add a new ingredient to the database.
* **6 View recipe page:**
This page displays the recipe that was selected by the user. Here it is possible to delete or edit the recipe if the user is the owner of the recipe.
    * **6.1 Change existing recipe page:**
This page displays the recipe in update mode, where the instructions and description of the recipe can be edited. Ingredients can also be added or removed from the recipe. This is only accessible if the user is the owner of the recipe.
* **7 Shopping lists page:**
This page displays a user’s shopping lists and has the option to add new shopping lists or open a specific one.
    * **7.1 View existing shopping list page:**
This page displays a previously existing or new shopping list, with an editable name of the shopping list as well as the option to add ingredients and their quantities.
* **8 Search page:**
This page lets the user search for recipes based on different criteria
* **9 About page:**
This page displays a description of the web app features, the reason why we built this platform, as well as a link to an external git project.
* **10 Q&A page:**
This page displays simple and frequently asked questions.


### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
