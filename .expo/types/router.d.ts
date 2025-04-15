/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/results`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/ResultsDetails/ResultsDetailsScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/ResultsListing/ResultsListingScreen`; params?: Router.UnknownInputParams; } | { pathname: `/result/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/results`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/ResultsDetails/ResultsDetailsScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/ResultsListing/ResultsListingScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/result/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/results${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens/ResultsDetails/ResultsDetailsScreen${`?${string}` | `#${string}` | ''}` | `/screens/ResultsListing/ResultsListingScreen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/results`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/ResultsDetails/ResultsDetailsScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/ResultsListing/ResultsListingScreen`; params?: Router.UnknownInputParams; } | `/result/${Router.SingleRoutePart<T>}` | { pathname: `/result/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
