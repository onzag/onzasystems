
import React from "react";

import Route from "@onzag/itemize/client/components/navigation/Route";

import { Articles } from "./articles";
import { Article } from "./article";

/**
 * Provides the news page and all its subpages for fast prototyping
 */
export function News() {
  return (
    <>
      <Route path="/news" exact={true} component={Articles} />
      <Route path="/news/:id" exact={true} component={Article} />
    </>
  );
}
