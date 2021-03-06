import { initializeServer } from "@onzag/itemize/server";
import { capitalize, localeReplacer } from "@onzag/itemize/util";

// Check the client for info on these, we are replicating what is used in the client somewhat
import React from "react";
import App from "../client/app";
import { rendererContext } from "@onzag/itemize/client/fast-prototyping/renderers";
import { appWrapper, mainWrapper } from "@onzag/itemize/client/fast-prototyping/wrappers";
import { styleCollector } from "@onzag/itemize/client/fast-prototyping/collectors";
import { fileURLAbsoluter } from "@onzag/itemize/util";

// Itemize server isn't hot, it won't refresh in realtime and it
// isn't recommended to attempt to set it up that way

// for a given build number all the resources are considered equal,
// resources are contained within the /rest/resources/ endpoint during
// development of the app remember to disable service workers by making it
// bypass for network or otherwise the content you will get will always be the
// same, this bypasses the build number functionality on the client side
// but only after reload

// some changes require a server reload as well, such as enforcing a new build number
// adding new languages, changing API keys, etc... and of course, changing server code

// itemize is heavily offline so it always attempts not to call the server, itemize
// apps are also aware of when they are not connected to the server and it doesn't make
// them crash (except in development mode with service workers off)

// when a new version of an itemize app is deployed the client can realize that
// due to a new build number that doesn't match its internal build number, which will
// trigger the refresh of all the resources and wipes the client side caches a refresh
// is requested, if the app is just being launched when that is detected, it will refresh
// immediately and load the new version, otherwise if it happens while the user uses the app
// it will mark the app as outdated and you can have custom logic for outdated apps
// outdated apps only exists for that session

initializeServer(
  {
    ssrRules: {
      // for the frontpage we must watch out this matches what is setup in the client
      // as this is for SSR, description, og fields, can be set to whatever there's nothing
      // done for them in the client side
      "/": (req, lang, root) => {
        // in the client the title is set to the app name
        const i18nData = root.getI18nDataFor(lang);
        return {
          title: capitalize(i18nData.app_name),
          description: i18nData.app_description,
          ogTitle: capitalize(i18nData.app_name),
          ogDescription: i18nData.app_description,
          ogImage: "/rest/resource/icons/android-chrome-512x512.png",
          collect: [
            ["cms", "fragment", 1, lang],
            ["cms", "article", 2, lang],
            ["cms", "article", 3, lang],
            ["cms", "article", 4, lang],
            ["cms", "article", 5, lang],
            ["cms", "article", 6, lang],
            ["cms", "article", 7, lang],
            ["cms", "article", 8, lang],
            ["cms", "article", 9, lang],
            ["cms", "article", 10, lang],
            ["cms", "fragment", 11, lang],
            ["cms", "fragment", 12, lang],
            ["cms", "fragment", 13, lang],
          ],
          collectResources: [],
        };
      },
      "/article/:id": (req, lang, root) => {
        const articleIdef = root.getModuleFor(["cms"]).getItemDefinitionFor(["article"]);
        const articleId = parseInt(req.params.id, 10);
        if (isNaN(articleId)) {
          return null;
        }
        return {
          title: (collectedValues) => {
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }

            return collectedValues[0].value.DATA.title;
          },
          description: (collectedValues) => {
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }
            return collectedValues[0].value.DATA.summary || null;
          },
          ogTitle: (collectedValues) => {
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }

            return collectedValues[0].value.DATA.title;
          },
          ogDescription: (collectedValues) => {
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }

            return collectedValues[0].value.DATA.summary;
          },
          ogImage: (collectedValues, config) => {
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }
            const summaryImageProperty = articleIdef.getPropertyDefinitionFor("summary_image", false);
            const absolutedFile = fileURLAbsoluter(
              process.env.NODE_ENV === "production" ? config.productionHostname : config.developmentHostname,
              config.containersHostnamePrefixes,
              collectedValues[0].value.DATA.summary_image,
              articleIdef,
              collectedValues[0].value.id,
              collectedValues[0].value.version,
              collectedValues[0].value.container_id,
              null,
              summaryImageProperty,
              false,
            );
            // no profile picture, absolutedFile might be null, then set it to the standard icon
            return (absolutedFile && absolutedFile.url) || "/rest/resource/icons/android-chrome-512x512.png";
          },
          collect: [
            ["cms", "article", articleId, lang],
          ],
          collectResources: [],
        };
      },
      "/profile/:id": (req, lang, root) => {
        const userIdef = root.getModuleFor(["users"]).getItemDefinitionFor(["user"]);
        const i18nData = userIdef.getI18nDataFor(lang);
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
          // use the standard this is a path we know nothing
          // about, that means SSR won't be used, the client will
          // need to handle all itself
          return null;
        }
        return {
          // this is the same as specified in our page
          title: capitalize(i18nData.custom.profile),

          // the description includes our user name, so we need to fetch it
          // by using a collected function callback
          description: (collectedValues) => {
            // forbidden access due to role, not found, value has been flagged and blocked by moderator
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }
            return localeReplacer(i18nData.custom.profile_for_description, collectedValues[0].value.DATA.username);
          },
          ogTitle: capitalize(i18nData.custom.profile),
          ogDescription: (collectedValues) => {
            // forbidden access due to role, not found, value has been flagged and blocked by moderator
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }
            return localeReplacer(i18nData.custom.profile_for_description, collectedValues[0].value.DATA.username);
          },
          ogImage: (collectedValues, config) => {
            // forbidden access due to role, not found, value has been flagged and blocked by moderator
            if (!collectedValues[0] || !collectedValues[0].value || !collectedValues[0].value.DATA) {
              return null;
            }
            const profilePictureProperty = userIdef.getPropertyDefinitionFor("profile_picture", false);
            // files need to fetch the absolute url with has to be with the
            // container they are in, because containers aren't centralized
            // we need to use this function,
            const absolutedFile = fileURLAbsoluter(
              process.env.NODE_ENV === "production" ? config.productionHostname : config.developmentHostname,
              config.containersHostnamePrefixes,
              collectedValues[0].value.DATA.profile_picture,
              userIdef,
              collectedValues[0].value.id,
              collectedValues[0].value.version,
              collectedValues[0].value.container_id,
              null,
              profilePictureProperty,
              false,
            );
            // no profile picture, absolutedFile might be null, then set it to the standard icon
            return (absolutedFile && absolutedFile.url) || "/rest/resource/icons/android-chrome-512x512.png";
          },
          collect: [
            ["users", "user", userId, null],
          ],
          collectResources: [],
        };
      },
    },
    // These are the same as of the client side
    rendererContext,
    mainComponent: React.createElement(App, null),
    mainWrapper,
    appWrapper,
    // the style collector which collects style for material UI SSR
    collector: styleCollector,
  },
  {
    seoRules: {
      "/": {
        crawable: true,
      },
      "profile/:id": {
        crawable: true,
        collect: [
          ["users", "user"],
        ],
      },
      "article/:id": {
        crawable: true,
        collect: [
          ["cms", "article"],
        ],
      },
    },
  },
);
