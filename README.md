# NestKeep
NestKeep is an inventory application for Android and iOS. In the app, the user can register their belongings and take note of where the item is placed, 
how many pieces of the item they have, and whether they need to buy more.

By keeping the information in the app updated, the user can save a lot of time and frustration by not having to search for those "I-know-I-have-one-but-where-did-I-put-it" items.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Future features and improvements](#future-features-and-improvements)

## Installation

### Install app
Download the code and unzip it. Place the config files (provided separately) in the root folder.

### Install dependencies
```npm install```
### Start app
If the phone and the computer are in the same network:

```npx expo start```

If the phone and the computer are in different networks:

```npx expo start --tunnel```

## Features
- Sign up, sign in, sign out, stay signed in even after closing the app.
- Create your folder structure.
- Delete folders and items by swiping.
- Increase or decrease the amount of an item.
- Possibility to flag items as favorites and add them to the shopping list.
- Check off items from the shopping list as you purchase them or remove them from the shopping list by swiping.
- Breadcrumbs for easy navigation.
- Real-time database (Firestore).
- Optimistic updates on amount and favorite screen.

## Usage

- To register for the app press *Sign up* and provide an e-mail and password (atleast 8 charachtrers). You will be signed in automatically when signing up and stay signed in until you sign out, even
  if you close the app.
- To add a folder, press the green folder in the top right corner and provide a folder name.
- To add an item press the ➕-sign in the bottom menu and provide the information about the item. The item will be added in the current folder unless you choose another folder. You can also add a new folder
  to put the new item in.
- Delete an item or folder by swiping left and pressing *Delete*. Deleting a folder will delete all items and subfolders in that folder.
- Press the ❤️ in the bottom menu to look at your favorites. Register or unrigister an item as a favorite by pressing the ❤️ next to the item.
- Press the 📃-symbol in the bottom menu to look at your shopping list. When you have purchased an item you can check the box next to the item. To remove all checked items, press the *Remove checked items*-button
  on top of the screen. You can also remove an item from the list by swiping left and pressing *Remove from list*.
- To sign out, press the symbol to the far right in the bottom menu and press *Sign out*. Don't worry, your items will still be here when you get back.


## Future features and improvements

- Possibility to share chosen folder with others.
- Edit and move items and folders.
- Add images of the items
- Show items based on category
- Search and filter items
- Prevent duplicates




