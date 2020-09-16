import React from "react";

import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { NoStateItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";

/**
 * Displays a list of articles and allows these to be searched by the user
 * this is a fast prototyping component
 * @returns a react element
 */
export function Articles() {
  return (
    <>
      <ModuleProvider module="cms">
        <NoStateItemDefinitionProvider itemDefinition="article">
          <I18nRead id="news" capitalize={true}>
            {(i18nNews: string) => {
              return (
                <TitleSetter>
                  {i18nNews}
                </TitleSetter>
              );
            }}
          </I18nRead>
        </NoStateItemDefinitionProvider>
      </ModuleProvider>
    </>
  );
}
