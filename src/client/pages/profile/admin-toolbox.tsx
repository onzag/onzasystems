import React from "react";

import Entry from "@onzag/itemize/client/components/property/Entry";
import SubmitActioner from "@onzag/itemize/client/components/item/SubmitActioner";

import { Divider, withStyles, WithStyles, createStyles, DoneOutlineIcon } from "@onzag/itemize/client/fast-prototyping/mui-core";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";

/**
 * The admin toolbox styles
 */
const adminToolboxStyles = () => createStyles({
  divider: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
});

/**
 * The admin toolbox appears on the public profile for allowing to change roles
 * and other admin activities
 * @param props the toolbox props
 * @returns a react element
 */
export const AdminToolbox = withStyles(adminToolboxStyles)((props: WithStyles<typeof adminToolboxStyles>) => {
  return (
    <React.Fragment>
      <Divider className={props.classes.divider}/>
      <Entry id="role"/>
      <SubmitButton
        i18nId="update_profile"
        options={{
          properties: ["role"],
          differingOnly: true,
        }}
        buttonColor="primary"
        buttonStartIcon={<DoneOutlineIcon />}
        buttonVariant="contained"
      />
      <SubmitActioner>
        {(actioner) => (
          <React.Fragment>
            <Snackbar
              id="submit-admin-toolbox-error"
              severity="error"
              i18nDisplay={actioner.submitError}
              open={!!actioner.submitError}
              onClose={actioner.dismissError}
            />
            <Snackbar
              id="submit-admin-toolbox-success"
              severity="success"
              i18nDisplay="profile_updated_successfully"
              open={actioner.submitted}
              onClose={actioner.dismissSubmitted}
            />
          </React.Fragment>
        )}
      </SubmitActioner>
    </React.Fragment>
  );
});
