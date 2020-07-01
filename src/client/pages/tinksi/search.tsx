import React from "react";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import Entry from "@onzag/itemize/client/components/property/Entry";
import { createStyles, withStyles, WithStyles, Typography, ExpansionPanel,
  ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon, SearchIcon,
  Card, CardContent, CardActions, Button } from "@onzag/itemize/client/fast-prototyping/mui-core";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import { SearchButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import SearchActioner from "@onzag/itemize/client/components/search/SearchActioner";
import { SearchLoaderWithPagination } from "@onzag/itemize/client/fast-prototyping/components/search-loader-with-pagination";
import View from "@onzag/itemize/client/components/property/View";
import Link from "@onzag/itemize/client/components/navigation/Link";
import ScrollKeeper from "@onzag/itemize/client/components/util/ScrollKeeper";

const tinksiStyles = createStyles({
  header: {
    width: "100%",
    paddingBottom: "1rem",
    fontWeight: 300,
  },
  heading: {
    fontSize: "1rem",
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  panel: {
    width: "100%",
  },
  panelContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  searchButtonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingBottom: "1rem",
    marginBottom: "1rem",
    borderBottom: "solid 1px #ccc",
    width: "100%",
    paddingTop: "1rem",
  },
  card: {
    minWidth: "300px",
    margin: "0 2rem 1rem 1rem",
  },
  cardTitle: {
    fontSize: "1rem",
  },
  cardDateSold: {
    marginBottom: "0.2rem",
  },
  cardContainer: {
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export const TinksiSearch = withStyles(tinksiStyles)((props: WithStyles<typeof tinksiStyles>) => {
  const searchOptions = (
    {
      requestedProperties: [
        "status",
        "date_sold",
        "customer_name",
        "model",
      ],
      searchByProperties: [
        "search",
        "status",
        "date_sold",
        "customer",
        "customer_name",
        "customer_company",
        "customer_address",
        "customer_email",
        "customer_phone",
        "activation_date",
        "shipment_date",
        "brand",
        "model",
        "serial_number",
        "dev_eui",
        "app_eui",
        "app_key",
        "abp_otaa",
        "nwk_skey",
        "app_skey",
        "dev_addrr",
        "info",
      ],
      limit: 100,
      offset: 0,
    }
  );
  // TODO search on enter
  return (
    <ScrollKeeper id="tinksi-search" mantainPosition={true}>
      <ItemDefinitionProvider
        itemDefinition="tinksi"
        searchCounterpart={true}
        properties={
          [
            "search",

            "status",
            "date_sold",
            "customer",
            "customer_name",
            "customer_company",
            "customer_address",
            "customer_email",
            "customer_phone",
            "info",
            "attachments",

            "activation_date",
            "shipment_date",
            "brand",
            "model",
            "serial_number",
            "dev_eui",
            "app_eui",
            "app_key",
            "abp_otaa",
            "nwk_skey",
            "app_skey",
            "dev_addrr",
          ]
        }
      >
        <SearchActioner>
          {(actioner) => (
            <Entry id="search" rendererArgs={{onEnter: actioner.search.bind(null, searchOptions)}}/>
          )}
        </SearchActioner>

        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="basic_info"
            id="basic_info"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="basic_info" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="status" searchVariant="exact" />
            <Entry id="date_sold" searchVariant="from" />
            <Entry id="date_sold" searchVariant="to" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="client_details"
            id="client_details"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="client_details" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="customer" searchVariant="exact" />
            <Entry id="customer_name" searchVariant="search" />
            <Entry id="customer_company" searchVariant="search" />
            <Entry id="customer_address" searchVariant="location" />
            <Entry id="customer_address" searchVariant="radius" />
            <Entry id="customer_email" searchVariant="exact" />
            <Entry id="customer_phone" searchVariant="exact" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="shipment_details"
            id="shipment_details"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="shipment_details" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="activation_date" searchVariant="from" />
            <Entry id="activation_date" searchVariant="to" />
            <Entry id="shipment_date" searchVariant="from" />
            <Entry id="shipment_date" searchVariant="to" />
            <Entry id="brand" searchVariant="search" />
            <Entry id="model" searchVariant="exact" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="sensor_details"
            id="sensor_details"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="sensor_details" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="serial_number" searchVariant="exact" />
            <Entry id="dev_eui" searchVariant="exact" />
            <Entry id="app_eui" searchVariant="exact" />
            <Entry id="app_key" searchVariant="exact" />
            <Entry id="abp_otaa" searchVariant="exact" />
            <Entry id="nwk_skey" searchVariant="exact" />
            <Entry id="app_skey" searchVariant="exact" />
            <Entry id="dev_addrr" searchVariant="exact" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} className={props.classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="additional_info"
            id="additional_info"
          >
            <Typography variant="h6" className={props.classes.heading}>
              <I18nRead id="additional_info" />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.panelContent}>
            <Entry id="info" searchVariant="search" />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div className={props.classes.searchButtonContainer}>
          <SearchButton
            i18nId="search"
            buttonColor="primary"
            buttonVariant="contained"
            buttonStartIcon={<SearchIcon/>}
            options={searchOptions}
          />
        </div>

        <SearchLoaderWithPagination pageSize={10}>
          {(arg, pagination) => {
            return (
              <>
                <div className={props.classes.cardContainer}>
                  {arg.searchRecords.map((record) => (
                    <ItemDefinitionProvider {...record.providerProps}>
                      <Link to={`/tinksi/view/${record.id}`}>
                        <Card variant="outlined" className={props.classes.card}>
                          <CardContent>
                            <Typography className={props.classes.cardTitle} color="textSecondary" gutterBottom={true}>
                              <View id="status" capitalize={true} />
                            </Typography>
                            <Typography variant="h5" component="h2">
                              <View id="customer_name" />
                            </Typography>
                            <Typography className={props.classes.cardDateSold} color="textSecondary">
                              <View id="date_sold" />
                            </Typography>
                            <Typography variant="body2" component="p">
                              <View id="model" />
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" variant="outlined" color="secondary">
                              <I18nRead id="more_details" capitalize={true}/>
                            </Button>
                          </CardActions>
                        </Card>
                      </Link>
                    </ItemDefinitionProvider>
                  ))}
                </div>
                {pagination}
              </>
            );
          }}
        </SearchLoaderWithPagination>

      </ItemDefinitionProvider>
    </ScrollKeeper>
  );
});
