import React from "react";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { Articles } from "./articles";
import { Hero } from "./hero";
import { FragmentBit } from "./fragment-bit";

/**
 * Provides the frontpage
 */
export function Frontpage() {
  return (
    <>
      <I18nRead id="app_name" capitalize={true}>
        {(i18nAppName: string) => {
          return (
            <TitleSetter>
              {i18nAppName}
            </TitleSetter>
          );
        }}
      </I18nRead>
      <Hero />
      <Articles />
      <FragmentBit id={11} />
      <FragmentBit id={12} />
      <FragmentBit id={13} />
    </>
  );
}
