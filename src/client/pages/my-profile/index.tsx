import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import Redirect from "@onzag/itemize/client/components/navigation/Redirect";
import UserDataRetriever from "@onzag/itemize/client/components/user/UserDataRetriever";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";

import { NeedsSubmitPrompt } from "@onzag/itemize/client/fast-prototyping/components/needs-submit-prompt";

import { CurrentUserProfile } from "./current-user";

/**
 * This is the main component that provides access to the current user profile
 * it reads a lot of data and contains a lot of entries
 * @returns a react component
 */
export function MyProfile() {
  return (
    <UserDataRetriever>
      {(userData) => {
        if (!userData.id) {
          // redirect if not logged in
          return (
            <Redirect to="/" />
          );
        }
        const properties = [
          "username",
          "app_language",
          "app_country",
          "app_currency",
          "e_validated",
          "role",
          "profile_picture",
          "email",
          "password",
          "e_notifications",
          "e_newsletter",
          "address",
          "about_me",
        ];
        return (
          <ModuleProvider module="users">
            <ItemProvider
              itemDefinition="user"
              properties={properties}
              forId={userData.id}
              assumeOwnership={true}
              includePolicies={true}
              longTermCaching={true}
              markForDestructionOnLogout={true}
              mountId="my-profile"
              cleanOnDismount={{
                propertiesToRestoreOnAny: [
                  "username",
                  "email",
                  "about_me",
                ],
              }}
            >
              <NeedsSubmitPrompt
                properties={[
                  "email",
                  "username",
                  "about_me",
                ]}
                i18nConfirm="update_profile"
                confirmationSubmitOptions={{
                  properties: ["email", "username", "about_me"],
                  differingOnly: true,
                }}
              />
              <I18nRead id="profile" capitalize={true}>
                {(i18nProfile: string) => {
                  return (
                    <TitleSetter>
                      {i18nProfile}
                    </TitleSetter>
                  );
                }}
              </I18nRead>
              <CurrentUserProfile />
            </ItemProvider>
          </ModuleProvider>
        );
      }}
    </UserDataRetriever>
  );
}
