import React from "react";

import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import HTMLResourceLoader from "@onzag/itemize/client/components/resources/HTMLResourceLoader";

/**
 * The terms and conditions fast prototyping page
 * @returns a react element
 */
export function TermsAndConditions() {
  return (
    <>
      <I18nRead id="terms_and_conditions" capitalize={true}>
        {(i18nTermsAndConditions: string) => (
          <TitleSetter>
            {i18nTermsAndConditions}
          </TitleSetter>
        )}
      </I18nRead>
      <I18nRead id="terms_and_conditions_url">
        {(termsAndConditionsURL: string) => (
          <HTMLResourceLoader src={termsAndConditionsURL} />
        )}
      </I18nRead>
    </>
  );
}
