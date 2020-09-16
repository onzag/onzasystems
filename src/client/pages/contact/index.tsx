import React from "react";

import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import HTMLResourceLoader from "@onzag/itemize/client/components/resources/HTMLResourceLoader";

/**
 * The contact fast prototyping page
 * @returns a react element
 */
export function Contact() {
  return (
    <>
      <I18nRead id="contact" capitalize={true}>
        {(i18nContact: string) => (
          <TitleSetter>
            {i18nContact}
          </TitleSetter>
        )}
      </I18nRead>
      <I18nRead id="contact_url">
        {(i18nContactURL: string) => (
          <HTMLResourceLoader src={i18nContactURL} />
        )}
      </I18nRead>
    </>
  );
}
