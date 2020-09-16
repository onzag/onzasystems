import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import UserActioner, { IUserActionerArg } from "@onzag/itemize/client/components/user/UserActioner";
import { localizedRedirectTo } from "@onzag/itemize/client/components/navigation";
import LocationStateReader from "@onzag/itemize/client/components/navigation/LocationStateReader";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import Reader from "@onzag/itemize/client/components/property/Reader";
import Entry from "@onzag/itemize/client/components/property/Entry";

import { ItemDefinitionLoader } from "@onzag/itemize/client/fast-prototyping/components/item-definition-loader";
import { createStyles, withStyles, WithStyles, Typography,
  Paper, Container, Divider, Button, DoneIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { ProgressingElement } from "@onzag/itemize/client/fast-prototyping/components/util";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";

import { Avatar } from "../../components/avatar";

/**
 * Contains the reset password styles
 */
const resetPasswordStyles = createStyles({
  container: {
    paddingTop: "1rem",
  },
  paper: {
    padding: "1rem",
  },
  username: {
    fontWeight: 300,
    width: "100%",
    marginTop: "1rem",
    textAlign: "center",
  },
  recoverTitle: {
    fontWeight: 300,
    margin: "1rem 0",
    width: "100%",
    textAlign: "center",
  },
  divider: {
    margin: "1rem 0",
  },
});

/**
 * The action as asked once the reset password has been requested
 * @param token the token for resetting the password
 * @param actioner and the user actioner
 */
async function resetPassword(token: string, actioner: IUserActionerArg) {
  const result = await actioner.resetPassword(token, true);
  if (!result.error) {
    // we give the reset_password_success message from the root message
    localizedRedirectTo("/?msg=reset_password_success&msgtitle=reset_password", null, true);
  }
}

/**
 * A compliant fast prototyping reset password component, extract
 * both the token and the id from the location state by using the location state reader
 * from the query string and uses such info in the user actioner
 * @param props the reset password props
 * @returns a react element
 */
export const ResetPassword = withStyles(resetPasswordStyles)((props: WithStyles<typeof resetPasswordStyles>) => {
  return (
    <LocationStateReader
      defaultState={{ token: null, id: null } as { token: string, id: string }}
      stateIsInQueryString={true}
    >
      {(state) => {
        const userId = parseInt(state.id, 10) || null;

        if (!userId) {
          return null;
        }

        return (
          <ModuleProvider module="users">
            <ItemDefinitionProvider
              itemDefinition="user"
              properties={[
                "username",
                "profile_picture",
                "password",
                "role",
              ]}
              forId={userId}
              mountId="reset-password"
              cleanOnDismount={{
                propertiesToCleanOnAny: ["password"],
              }}
            >
              <I18nRead id="reset_password" capitalize={true}>
                {(i18nResetPassword: string) => (
                  <>
                    <TitleSetter>
                      {i18nResetPassword}
                    </TitleSetter>
                    <Container maxWidth="md" className={props.classes.container}>
                      <Paper className={props.classes.paper}>
                        <ItemDefinitionLoader>
                          <Avatar size="large" fullWidth={true} hideFlag={true}/>
                          <Reader id="username">
                            {(username: string) => (
                              <Typography variant="h4" className={props.classes.username}>{username}</Typography>
                            )}
                          </Reader>
                        </ItemDefinitionLoader>
                        <Divider className={props.classes.divider} />
                        <Typography variant="h6" className={props.classes.recoverTitle}>{i18nResetPassword}</Typography>
                        <I18nRead id="reset_password_field_alt_label">
                          {(i18nAltLabel: string) => (
                            <I18nRead id="reset_password_field_alt_placeholder">
                              {(i18nAltPlaceholder: string) => (
                                <I18nRead id="reset_password_message">
                                  {(i18nAltDescription: string) => (
                                    <Entry
                                      id="password"
                                      altLabel={i18nAltLabel}
                                      altPlaceholder={i18nAltPlaceholder}
                                      altDescription={i18nAltDescription}
                                      autoFocus={true}
                                    />
                                  )}
                                </I18nRead>
                              )}
                            </I18nRead>
                          )}
                        </I18nRead>
                        <UserActioner>
                          {(actioner) => (
                            <React.Fragment>
                              <I18nRead id="reset_password_action">
                                {(i18nUpdatePassword: string) => (
                                  <ProgressingElement isProgressing={actioner.statefulOnProgress} fullWidth={true}>
                                    <Button
                                      aria-label={i18nUpdatePassword}
                                      fullWidth={true}
                                      size="large"
                                      variant="contained"
                                      color="primary"
                                      endIcon={<DoneIcon />}
                                      onClick={resetPassword.bind(null, state.token, actioner)}
                                    >
                                      {i18nUpdatePassword}
                                    </Button>
                                  </ProgressingElement>
                                )}
                              </I18nRead>
                              <Snackbar
                                id="reset-password-error"
                                severity="error"
                                i18nDisplay={actioner.statefulError}
                                open={!!actioner.statefulError}
                                onClose={actioner.dismissStatefulError}
                              />
                              <Snackbar
                                id="reset-password-success"
                                severity="success"
                                i18nDisplay="reset_password_success"
                                open={!!actioner.statefulSuccess}
                                onClose={actioner.dismissStatefulSuccess}
                              />
                            </React.Fragment>
                          )}
                        </UserActioner>
                      </Paper>
                    </Container>
                  </>
                )}
              </I18nRead>
            </ItemDefinitionProvider>
          </ModuleProvider>
        );
      }}
    </LocationStateReader>
  );
});
