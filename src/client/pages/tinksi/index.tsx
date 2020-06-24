import React from "react";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import { NoStateItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { Theme, createStyles, withStyles, WithStyles, Container, Paper, Button } from "@onzag/itemize/client/fast-prototyping/mui-core";
import Route from "@onzag/itemize/nodejs/client/components/navigation/Route";
import Link from "@onzag/itemize/nodejs/client/components/navigation/Link";
import { TinksiAdd } from "./add";
import { TinksiSearch } from "./search";

const tinksiStyles = createStyles({
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
  optionsContainer: {
    width: "100%",
  },
});

export const Tinksi = withStyles(tinksiStyles)((props: WithStyles<typeof tinksiStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <ModuleProvider module="suomi_connect_registry">
          <NoStateItemDefinitionProvider itemDefinition="tinksi" >
            <I18nRead id="name" capitalize={true}>
              {(i18nName: string) => (
                <TitleSetter>
                  {i18nName}
                </TitleSetter>
              )}
            </I18nRead>

            <Route exact={true} path="/tinksi">
              <div className={props.classes.optionsContainer}>
                <Link to="/tinksi/add/1">
                  <Button color="primary">
                    <I18nRead id="add"/>
                  </Button>
                </Link>
                <Link to="/tinksi/search">
                  <Button color="secondary">
                    <I18nRead id="find"/>
                  </Button>
                </Link>
              </div>
            </Route>
          </NoStateItemDefinitionProvider>

          <Route path="/tinksi/add/:step" component={TinksiAdd}/>
          <Route path="/tinksi/search" component={TinksiSearch}/>
        </ModuleProvider>
      </Paper>
    </Container >
  );
});
