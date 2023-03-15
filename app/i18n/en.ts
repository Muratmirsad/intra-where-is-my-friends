const en = {
  appNavigator: {
    home: "Home",
    search: "Search",
    settings: "Settings",
  },
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  searchScreen: {
    searchSublabel: "Note: The Vogons are an alien race from the planet Vogsphere",
    searchLabel: "Search for a vogon!",
    searchPlaceholder: "Search for a friend",
    noResults: "No results found",

  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    headerLabel: "Welcome Hasan!",
    headerSublabel: "Where Is My Friends? 🤔",
    emptyStateHeading: "No friends yet",
    emptyStateContent: "Add some friends to see where they are.",
    addFriendButton: "Add a friend 🚀",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
