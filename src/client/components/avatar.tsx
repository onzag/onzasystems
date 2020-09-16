import React from "react";

import Reader from "@onzag/itemize/client/components/property/Reader";
import { PropertyDefinitionSupportedFileType } from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { IPropertyDefinitionState } from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition";

import { Avatar as FastPrototypingAvatar } from "@onzag/itemize/client/fast-prototyping/components/avatar";

type profileURLFn = (id: number) => string;

interface IAvatarProps {
  size?: "small" | "medium" | "large";
  hideFlag?: boolean;
  showWarnings?: boolean;
  profileURL?: string | profileURLFn;
  cacheImage?: boolean;
  fullWidth?: boolean;
  linkClassName?: string;
}

/**
 * The avatar will display a nice avatar profile image for the given user in the given context
 * it should be in an item definition provider for that specific user and contain the following properties
 *
 * - profile_picture
 * - role
 * - username
 * - app_country
 *
 * if hideFlag is true then app_country is not necessary
 *
 * if showWarnings is true then the following properties are also necessary
 *
 * - email
 * - e_validated
 * - address
 *
 * showWarnings is basically only useful for when displaying own currently logged user information in
 * the navbar or somewhere else where this is relevant
 *
 * @param props the avatar props
 * @returns a react component
 */
export function Avatar(props: IAvatarProps) {
  // so this is the standard logic
  return (
    <Reader id="id">
      {(id: number) => (
        <Reader id="profile_picture">
          {(profilePictureValue: PropertyDefinitionSupportedFileType) => (
            <Reader id="role">
              {(role: string) => (
                <Reader id="username">
                  {
                    (userNameValue: string) => {
                      // ensuring not to display as special user if it hasn't loaded
                      // the role yet
                      const isSpecialUser = role && role !== "USER";

                      const baseAvatarProps = {
                        size: props.size ? props.size : "small",
                        id,
                        isSpecialUser,
                        userNameValue,
                        profilePictureValue,
                        profileURL: (
                          props.profileURL ?
                            (typeof props.profileURL === "string" ? props.profileURL : props.profileURL(id)) :
                            `/profile/${id}`
                        ),
                        cacheImage: props.cacheImage,
                        fullWidth: props.fullWidth,
                        linkClassName: props.linkClassName,
                      };

                      if (!props.showWarnings && props.hideFlag) {
                        return (
                          <FastPrototypingAvatar
                            {...baseAvatarProps}
                          />
                        );
                      } else if (!props.showWarnings) {
                        return (
                          <Reader id="app_country">
                            {(countryCode: string) => (
                              <FastPrototypingAvatar
                                {...baseAvatarProps}
                                countryCode={countryCode}
                              />
                            )}
                          </Reader>
                        );
                      }

                      return (
                        <Reader id="email">
                          {(email: string, emailState: IPropertyDefinitionState) => (
                            <Reader id="e_validated">
                              {(eValidated: boolean, eValidatedState: IPropertyDefinitionState) => (
                                <Reader id="address">
                                  {(address, addressState) => {
                                    // now we check for these warnings
                                    const hasWarningForMissingEmail =
                                      !(emailState && emailState.stateAppliedValue);
                                    const hasWarningForNotValidEmail =
                                      !(eValidatedState && eValidatedState.stateAppliedValue);
                                    const hasAnotherWarningForMissingAddress =
                                      !(addressState && addressState.stateAppliedValue);

                                    let warningCount = 0;
                                    if (hasWarningForMissingEmail || hasWarningForNotValidEmail) {
                                      warningCount++;
                                    }
                                    if (hasAnotherWarningForMissingAddress) {
                                      warningCount++;
                                    }

                                    if (props.hideFlag) {
                                      return (
                                        <FastPrototypingAvatar
                                          {...baseAvatarProps}
                                          warningCount={warningCount}
                                        />
                                      );
                                    } else {
                                      return (
                                        <Reader id="app_country">
                                          {(countryCode: string) => (
                                            <FastPrototypingAvatar
                                              {...baseAvatarProps}
                                              warningCount={warningCount}
                                              countryCode={countryCode}
                                            />
                                          )}
                                        </Reader>
                                      );
                                    }
                                  }}
                                </Reader>
                              )}
                            </Reader>
                          )}
                        </Reader>
                      );
                    }
                  }
                </Reader>
              )}
            </Reader>
          )}
        </Reader>
      )}
    </Reader>
  );
}
