import React from "react";

import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";

import { PublicUserProfile } from "./public-user";

/**
 * The profile props
 */
interface IProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

/**
 * Represents a public user profile component
 * that displays basic information about a public user
 *
 * @param props the profile props
 * @returns a react element
 */
export function Profile(props: IProfileProps) {
  const currentUserId = parseInt(props.match.params.id, 10) || null;
  const properties = [
    "username",
    "app_language",
    "app_country",
    "app_currency",
    "e_validated",
    "role",
    "profile_picture",
    "about_me",
  ];
  return (
    <ModuleProvider module="users">
      <ItemProvider
        itemDefinition="user"
        properties={properties}
        forId={currentUserId}
        assumeOwnership={false}
        includePolicies={false}
      >
        <I18nRead id="profile" capitalize={true}>
          {(i18nProfile: string) => {
            return (
              <TitleSetter>
                {i18nProfile}
              </TitleSetter>
            );
          }}
        </I18nRead>
        <PublicUserProfile />
      </ItemProvider>
    </ModuleProvider>
  );
}
