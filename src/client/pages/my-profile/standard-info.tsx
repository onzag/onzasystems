import React from "react";
import { IActionSubmitOptions } from "@onzag/itemize/client/providers/item";
import Link from "@onzag/itemize/client/components/navigation/Link";
import I18nReadMany from "@onzag/itemize/client/components/localization/I18nReadMany";
import Entry from "@onzag/itemize/client/components/property/Entry";
import Reader from "@onzag/itemize/client/components/property/Reader";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import UserActioner from "@onzag/itemize/client/components/user/UserActioner";
// tslint:disable-next-line: import-spacing
import DifferingPropertiesRetriever from
  "@onzag/itemize/client/components/item/DifferingPropertiesRetriever";

import { Button, Box, Paper, createStyles, withStyles, WithStyles,
  Divider, Theme, DoneIcon, DoneOutlineIcon, MailIcon,
  Alert, AlertTitle, FaceIcon,
  ErrorIcon, AccountCircleIcon, AlernateEmailIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { ItemLoader } from "@onzag/itemize/client/fast-prototyping/components/item-loader";
import { LanguagePicker } from "@onzag/itemize/client/fast-prototyping/components/language-picker";
import { CountryPicker } from "@onzag/itemize/client/fast-prototyping/components/country-picker";
import { CurrencyPicker } from "@onzag/itemize/client/fast-prototyping/components/currency-picker";
import { ProgressingElement } from "@onzag/itemize/client/fast-prototyping/components/util";
import { AvatarRenderer } from "@onzag/itemize/client/fast-prototyping/components/avatar";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import { DialogResponsive } from "@onzag/itemize/client/fast-prototyping/components/dialog";
import { IPropertyDefinitionState } from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition";

/**
 * The custom confirmation dialog props for the dialog
 * that shows to confirm the password
 *
 * This dialog fits the description provided by the submit button confirmation
 * options
 */
interface ICustomConfirmationDialogProps {
  /**
   * whether the dialog is active and should be open
   */
  isActive: boolean;
  /**
   * What to do on close
   */
  onClose: (continueWithProcess: boolean) => void;
}

/**
 * The custom confirmation dialog that passes to the submit button as a means
 * of confirming the password, this dialog follows the guidelines of the submit
 * button component
 * @param props the props for the custom confirmation dialog
 * @returns a react element
 */
function CustomConfirmationDialog(props: ICustomConfirmationDialogProps) {
  return (
    <I18nReadMany
      data={
        [
          {
            id: "title",
            policyType: "edit",
            policyName: "REQUIRES_PASSWORD_CONFIRMATION",
          },
          {
            id: "ok",
          },
        ]
      }
    >
      {(i18nTitle, i18nOk) => (
        <DialogResponsive
          open={props.isActive}
          onClose={props.onClose.bind(null, false)}
          title={i18nTitle}
          buttons={
            <Button
              color="primary"
              startIcon={<DoneIcon />}
              onClick={props.onClose.bind(null, true)}
            >
              {i18nOk}
            </Button>
          }
        >
          <Entry id="password" policyName="REQUIRES_PASSWORD_CONFIRMATION" policyType="edit" />
        </DialogResponsive>
      )}
    </I18nReadMany>
  );
}

/**
 * The standard information styles
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const currentUserProfileStandardInfoStyles = (theme: Theme) => createStyles({
  paper: {
    padding: "1rem",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1.2rem",
  },
  containerBox: {
    paddingBottom: "1rem",
  },
  containerBoxButton: {
    padding: 0,
  },
  pickers: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonValidateEmailContainer: {
    paddingTop: "0.75rem",
  },
  emailInButton: {
    textTransform: "none",
    opacity: 0.7,
  },
  errorIconButton: {
    color: theme.palette.error.main,
  },
});

/**
 * The current user profile standard info shows the standard information of the current
 * user and allows to modify them in place
 * @param props the current user information props
 * @returns a react element
 */
export const CurrentUserProfileStandardInfo = withStyles(currentUserProfileStandardInfoStyles)
  ((props: WithStyles<typeof currentUserProfileStandardInfoStyles>) => {
    return (
      <Paper className={props.classes.paper}>
        <ItemLoader>
          <Entry
            id="profile_picture"
            renderer={AvatarRenderer}
            rendererArgs={{specialUsers: ["ADMIN", "MODERATOR"]}}
          />
          <div className={props.classes.pickers}>
            <LanguagePicker />
            <CountryPicker />
            <CurrencyPicker />
          </div>
          <Box className={props.classes.containerBox}>
            <I18nReadMany
              data={
                [
                  { id: "change_password" },
                  { id: "update_your_preferences" },
                ]
              }
            >
              {(i18nChangePassword, i18nPreferences) => (
                <>
                  <Link to="/preferences">
                    <Reader id="address">
                      {(value, stateValue) => {
                        const hasWarning = !(stateValue && stateValue.stateAppliedValue);

                        return (
                          <Button
                            variant="text"
                            size="small"
                            fullWidth={true}
                            className={props.classes.containerBoxButton}
                            endIcon={hasWarning ? <ErrorIcon className={props.classes.errorIconButton} /> : null}
                          >
                            {i18nPreferences}
                          </Button>
                        );
                      }}
                    </Reader>

                  </Link>
                  <Link to="/change-password">
                    <Button
                      variant="text"
                      size="small"
                      fullWidth={true}
                      className={props.classes.containerBoxButton}
                    >
                      {i18nChangePassword}
                    </Button>
                  </Link>
                </>
              )}
            </I18nReadMany>
          </Box>
          <Entry id="username" icon={<AccountCircleIcon />} />
          <Reader id="email">
            {(email: string, emailState: IPropertyDefinitionState) => {
              const missesEmail = !(emailState && emailState.stateAppliedValue);
              if (missesEmail) {
                return (
                  <Alert severity="error">
                    <AlertTitle>
                      <I18nRead capitalize={true} id="missing_email_warning_title" />
                    </AlertTitle>
                    <I18nRead id="missing_email_warning" />
                  </Alert>
                );
              }
              return (
                <Reader id="e_validated">
                  {(eValidated: boolean, eValidatedState: IPropertyDefinitionState) => {
                    const missesValidation = !(eValidatedState && eValidatedState.stateAppliedValue);
                    if (missesValidation) {
                      return (
                        <Alert severity="error">
                          <AlertTitle>
                            <I18nRead capitalize={true} id="missing_email_validation_warning_title" />
                          </AlertTitle>
                          <I18nRead id="missing_email_validation_warning" />
                          <div className={props.classes.alertButtonValidateEmailContainer}>
                            <UserActioner>
                              {(actioner) => (
                                <>
                                  <ProgressingElement isProgressing={actioner.statefulOnProgress}>
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      endIcon={<MailIcon />}
                                      onClick={actioner.sendValidateEmail}
                                    >
                                      <I18nRead capitalize={true} id="missing_email_validation_warning_action" />
                                      <i className={props.classes.emailInButton}>
                                        {" " + emailState.stateAppliedValue}
                                      </i>
                                    </Button>
                                  </ProgressingElement>
                                  <Snackbar
                                    id="standard-info-edit-error"
                                    severity="error"
                                    i18nDisplay={actioner.statefulError}
                                    open={!!actioner.statefulError}
                                    onClose={actioner.dismissStatefulError}
                                  />
                                  <Snackbar
                                    id="standard-info-edit-success"
                                    severity="success"
                                    i18nDisplay="missing_email_validation_warning_action_success"
                                    open={actioner.statefulSuccess}
                                    onClose={actioner.dismissStatefulSuccess}
                                  />
                                </>
                              )}
                            </UserActioner>
                          </div>
                        </Alert>
                      );
                    }

                    return null;
                  }}
                </Reader>
              );
            }}
          </Reader>

          <Entry id="email" rendererArgs={{ descriptionAsAlert: true }} icon={<AlernateEmailIcon />} />
          <Entry id="about_me" icon={<FaceIcon />} />

          <Divider />

          <Box className={props.classes.buttonBox}>
            <DifferingPropertiesRetriever mainProperties={["profile_picture", "username", "email", "about_me"]}>
              {(differingProperties) => {
                const options: IActionSubmitOptions = {
                  properties: differingProperties,
                  unpokeAfterAny: true,
                };

                if (
                  differingProperties.includes("username") ||
                  differingProperties.includes("email")
                ) {
                  options.policies = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
                  options.policiesToCleanOnAny = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
                }

                let CustomConfirmationComponent = null;
                if (options.policies) {
                  CustomConfirmationComponent = CustomConfirmationDialog;
                }
                return (
                  <SubmitButton
                    i18nId="update_profile"
                    options={options}
                    CustomConfirmationComponent={CustomConfirmationComponent}
                    buttonColor="primary"
                    buttonStartIcon={<DoneOutlineIcon />}
                    buttonVariant="contained"
                  />
                );
              }}
            </DifferingPropertiesRetriever>
          </Box>
        </ItemLoader>
      </Paper>
    );
  });
