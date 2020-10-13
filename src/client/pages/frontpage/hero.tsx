import React from "react";

import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import View from "@onzag/itemize/client/components/property/View";
import AppLanguageRetriever from "@onzag/itemize/client/components/localization/AppLanguageRetriever";

import { withStyles, WithStyles } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { ItemLoader } from "@onzag/itemize/client/fast-prototyping/components/item-loader";

/**
 * The hero style
 */
const heroStyle = {
  heroContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as "column",
    width: "100%",
    height: "70vh",
    borderBottom: "solid 1rem #ccc",
  },
};

/**
 * The hero component uses the cms provider to load a fragment with a given
 * id, this represents trusted fragment content to it can be pure HTML
 * it loads the fragment with id 1 for this
 */
export const Hero = withStyles(heroStyle)((props: WithStyles<typeof heroStyle>) => {
  return (
    <div className={props.classes.heroContainer + " trusted"}>
      <ModuleProvider module="cms">
        <AppLanguageRetriever>
          {(languageData) => (
            <ItemProvider
              itemDefinition="fragment"
              forId={1}
              forVersion={languageData.currentLanguage.code}
              longTermCaching={true}
              properties={
                [
                  "content",
                  "attachments",
                ]
              }
              static="NO_LISTENING"
            >
              <ItemLoader>
                <View id="content" />
              </ItemLoader>
            </ItemProvider>
          )}
        </AppLanguageRetriever>
      </ModuleProvider>
    </div>
  );
});
