import React from "react";

import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import HTMLResourceLoader from "@onzag/itemize/client/components/resources/HTMLResourceLoader";

/**
 * The privacy policy fast prototyping page
 * @returns a react element
 */
export function PrivacyPolicy() {
  return (
    <>
      <I18nRead id="privacy_policy" capitalize={true}>
        {(i18nPrivacyPolicy: string) => (
          <TitleSetter>
            {i18nPrivacyPolicy}
          </TitleSetter>
        )}
      </I18nRead>
      <I18nRead id="privacy_policy_url">
        {(privacyPolicyURL: string) => (
          <HTMLResourceLoader src={privacyPolicyURL} />
        )}
      </I18nRead>
    </>
  );
}
