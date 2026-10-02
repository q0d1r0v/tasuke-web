/**
 * Store listings.
 *
 * ⚠️ Flip `live` to true only once the listing is actually public. While it is
 * false the badge renders as "Coming soon" and is not a link — a badge that
 * opens a "this app is not available" page is worse than no badge.
 */
export const stores = {
  ios: {
    live: false,
    appId: "6815217687",
    url: "https://apps.apple.com/app/id6815217687",
    label: "Download on the App Store",
    comingSoon: "Coming soon to the App Store",
  },
  android: {
    live: true,
    packageName: "uz.digitalgroup.tasuke",
    url: "https://play.google.com/store/apps/details?id=uz.digitalgroup.tasuke",
    label: "Get it on Google Play",
    comingSoon: "Coming soon to Google Play",
  },
} as const;

export type StoreKey = keyof typeof stores;

export const anyStoreLive = stores.ios.live || stores.android.live;
