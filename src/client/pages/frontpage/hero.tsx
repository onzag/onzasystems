import React from "react";

import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import View from "@onzag/itemize/client/components/property/View";
import AppLanguageRetriever from "@onzag/itemize/client/components/localization/AppLanguageRetriever";

import { withStyles, WithStyles } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { ItemDefinitionLoader } from "@onzag/itemize/client/fast-prototyping/components/item-definition-loader";

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
            <ItemDefinitionProvider
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
              <ItemDefinitionLoader>
                <View id="content" />
              </ItemDefinitionLoader>
            </ItemDefinitionProvider>
          )}
        </AppLanguageRetriever>
      </ModuleProvider>
    </div>
  );
});
