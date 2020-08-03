import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import Entry from "@onzag/itemize/client/components/property/Entry";
import {
  createStyles, withStyles, WithStyles, Container, Paper,
} from "@onzag/itemize/client/fast-prototyping/mui-core";

const referenceStyles = createStyles({
  container: {
    paddingTop: "1rem",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "1rem",
  },
});

export const References = withStyles(referenceStyles)((props: WithStyles<typeof referenceStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <ModuleProvider module="references">
          <ItemDefinitionProvider
            itemDefinition="user"
            properties={[
              "reference",
            ]}
          >
            <I18nRead id="name" capitalize={true}>
              {(i18nName: string) => (
                <TitleSetter>
                  {i18nName}
                </TitleSetter>
              )}
            </I18nRead>

            <Entry id="reference"/>
          </ItemDefinitionProvider>
        </ModuleProvider>
      </Paper>
    </Container >
  );
});
