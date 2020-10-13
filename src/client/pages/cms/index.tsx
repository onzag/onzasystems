import React from "react";

import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import Route from "@onzag/itemize/client/components/navigation/Route";
import { localizedRedirectTo } from "@onzag/itemize/client/components/navigation";
import { NoStateItemProvider } from "@onzag/itemize/client/providers/item";

import { AppBar, Tabs, Tab } from "@onzag/itemize/client/fast-prototyping/mui-core";

import { Fragment } from "./fragment";
import { Article } from "./article";
import { Info } from "./info";

/**
 * The props for the cms navbar
 */
interface ICMSNavBarProps {
  /**
   * The current location
   */
  location: {
    pathname: string;
  };
}

/**
 * Used in the tabs for change using the tabs
 * @param e the change event (unused)
 * @param value the value it changed to
 */
function handleNavbarChangeEvent(e: React.ChangeEvent, value: string) {
  if (value === "info") {
    localizedRedirectTo("/cms");
    return;
  }
  localizedRedirectTo("/cms/" + value);
}

/**
 * The cms navigation bar component
 * @param props the props passed by the cms component
 * @returns a react element
 */
function CMSNavBar(props: ICMSNavBarProps) {
  const current = props.location.pathname.split("/")[3] || "info";

  const available: string[] = ["fragment", "article"];

  return (
    <AppBar position="static" variant="outlined" color="default">
      <Tabs value={current} onChange={handleNavbarChangeEvent} centered={true}>
        <Tab label={<I18nRead id="info" />} value="info" />
        {available.map((itemDefinition: string) => {
          return (
            <Tab
              key={itemDefinition}
              label={
                <NoStateItemProvider
                  itemDefinition={itemDefinition}
                >
                  <I18nRead id="name" />
                </NoStateItemProvider>
              }
              value={itemDefinition}
            />
          );
        })}
      </Tabs>
    </AppBar>
  );
}

/**
 * A fast prototyping page which represents the cms for the cms module
 * that allows to modify and create cms elements
 *
 * @param props the props for the cms
 * @returns a react element
 */
export function CMS() {
  return (
    <ModuleProvider module="cms">
      <I18nRead id="name" capitalize={true}>
        {(i18nCMS: string) => {
          return (
            <TitleSetter>
              {i18nCMS}
            </TitleSetter>
          );
        }}
      </I18nRead>
      <Route
        path="/cms"
        component={CMSNavBar}
      />
      <Route path="/cms" exact={true} component={Info} />
      <Route path="/cms/fragment" component={Fragment} />
      <Route path="/cms/article" component={Article} />
    </ModuleProvider>
  );
}
