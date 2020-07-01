import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { NoStateItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { createStyles, withStyles, WithStyles, Container, Paper, Button } from "@onzag/itemize/client/fast-prototyping/mui-core";
import Route from "@onzag/itemize/client/components/navigation/Route";
import Link from "@onzag/itemize/client/components/navigation/Link";

const frontpageStyles = createStyles({
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

export const Frontpage = withStyles(frontpageStyles)((props: WithStyles<typeof frontpageStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <I18nRead id="app_name" capitalize={true}>
          {(i18nAppName: string) => {
            return (
              <TitleSetter>
                {i18nAppName}
              </TitleSetter>
            );
          }}
        </I18nRead>
      </Paper>
    </Container >
  );
});
