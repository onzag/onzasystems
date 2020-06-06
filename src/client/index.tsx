import React from "react";
import App from "./app";
import { initializeItemizeApp } from "@onzag/itemize/client";
import { rendererContext } from "@onzag/itemize/client/fast-prototyping/renderers";
import { appWrapper, mainWrapper } from "@onzag/itemize/client/fast-prototyping/wrappers";

import "./rich-extensions.scss";

initializeItemizeApp(
  // the renderer context specifies how property components (viewers and editors) are
  // rendered, by default itemize contains its own fast prototyping renderers, these use
  // google's material design; you might want to develop your own renderer context, the primary
  // renderer context cannot be changed, you might want to check @onzag/itemize/client/providers/renderer
  // in order to change renderer contexts on the fly during app execution, say if you support some form
  // of theming, but overall you should rely on args for theming.
  // The rendererContext can be null, but this will mean that entries and views for properties cannot be used.
  rendererContext,

  // This is the main app
  <App/>,

  // These options are actually optional, however very useful and specified here because
  // fast prototyping requires these contexts to be setup
  {
    // The app wrapper basically wraps the internal app, do not confuse with the app avobe, as your app
    // goes much under this internal app, this app wrapper is static and executed only
    // once and directly wraps the app, to mount it in the DOM,
    // in our fast prototyping app wrapper it provides the MaterialUI contexts
    // that are required by the renderers
    appWrapper,

    // The main wrappers wraps the main container contents, the app is configured in #root > #app > #main there are
    // three containers by default, the #root is a simple root container, #app is where actually react mounts
    // and #main is a component created by the internal app where your app component is initialized
    // the main wrapper wraps around this #main component, and executes every time the locale changes,
    // passing the <App/> above as argument, it isn't static, use this to wrap contexts that are locale sensitive,
    // in the case of fast prototyping it sets up the moment utils context that is required by material ui pickers.
    mainWrapper,
  },
);
