import React from "react";
import { WithStyles, createStyles, withStyles, Typography, EditIcon, IconButton, Button } from "@onzag/itemize/client/fast-prototyping/mui-core";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import View from "@onzag/itemize/client/components/property/View";
import Reader from "@onzag/itemize/client/components/property/Reader";
import { ItemDefinitionProvider } from "@onzag/itemize/client/providers/item-definition";
import Entry from "@onzag/itemize/client/components/property/Entry";
import Route from "@onzag/itemize/client/components/navigation/Route";
import ScrollKeeper from "@onzag/itemize/client/components/util/ScrollKeeper";
import Link from "@onzag/itemize/client/components/navigation/Link";
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import SubmitActioner from "@onzag/itemize/client/components/item-definition/SubmitActioner";
import { goBack } from "@onzag/itemize/client/components/navigation";

const basicViewStyles = createStyles({
  infoRow: {
    width: "100%",
    position: "relative",
    padding: "0.25rem",
  },
  infoRowLabel: {
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoRowInfo: {
    fontWeight: 300,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingBottom: "2rem",
  },
  infoColumn: {
    width: "50%",
    padding: "0 1rem",
  },
  infoColumnTitle: {
    width: "100%",
    display: "block",
    fontWeight: 500,
    fontSize: "1rem",
    paddingTop: "1rem",
    paddingBottom: "0.2rem",
    marginBottom: "0.4rem",
    borderBottom: "solid 1px #ccc",
  },
  infoMap: {
    width: "100%",
    paddingBottom: "1rem",
  },
  richText: {
    width: "100%",
  },
  editButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  editButton2: {

  },
});

function EditButton(props: {url: string, field: string, className: string}) {
  if (!props.url) {
    return null;
  }
  return (
    <Link to={props.url + props.field} className={props.className}>
      <IconButton>
        <EditIcon/>
      </IconButton>
    </Link>
  );
}

interface IBasicViewProps extends WithStyles<typeof basicViewStyles> {
  useAppliedValue?: boolean;
  useEditUrl?: string;
}

export const BasicView = withStyles(basicViewStyles)((props: IBasicViewProps) => {
  return (
    <>
      <div className={props.classes.infoContainer}>
        <div className={props.classes.infoColumn}>
          <Typography variant="body2" className={props.classes.infoColumnTitle}>
            <I18nRead id="basic_info" capitalize={true}/>
          </Typography>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="status" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View id="status" capitalize={true} useAppliedValue={props.useAppliedValue}/>
            </Typography>
            <EditButton url={props.useEditUrl} field="status" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="date_sold" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="date_sold"
                rendererArgs={{ NullComponent: I18nRead, nullComponentArgs: { id: "unspecified", capitalize: true } }}
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="date_sold" className={props.classes.editButton}/>
          </div>
          <Typography variant="body2" className={props.classes.infoColumnTitle}>
            <I18nRead id="client_details" capitalize={true}/>
          </Typography>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="customer" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="customer"
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="customer" className={props.classes.editButton}/>
          </div>
          <Reader id="customer">
            {(value: boolean, state) => {
              if (props.useAppliedValue ? state.stateAppliedValue : value) {
                return (
                  <>
                    <div className={props.classes.infoRow}>
                      <Typography variant="body2" className={props.classes.infoRowLabel}>
                        <I18nRead id="label" propertyId="customer_name" capitalize={true} />
                      </Typography>
                      <Typography variant="body2" className={props.classes.infoRowInfo}>
                        <View
                          id="customer_name"
                          useAppliedValue={props.useAppliedValue}
                          rendererArgs={
                            {
                              NullComponent: I18nRead,
                              nullComponentArgs: { id: "unspecified", capitalize: true },
                            }
                          }
                        />
                      </Typography>
                      <EditButton url={props.useEditUrl} field="customer_name" className={props.classes.editButton}/>
                    </div>
                    <div className={props.classes.infoRow}>
                      <Typography variant="body2" className={props.classes.infoRowLabel}>
                        <I18nRead id="label" propertyId="customer_company" capitalize={true} />
                      </Typography>
                      <Typography variant="body2" className={props.classes.infoRowInfo}>
                        <View
                          id="customer_company"
                          rendererArgs={
                            {
                              NullComponent: I18nRead,
                              nullComponentArgs: { id: "unspecified", capitalize: true },
                            }
                          }
                          useAppliedValue={props.useAppliedValue}
                        />
                      </Typography>
                      <EditButton url={props.useEditUrl} field="customer_company" className={props.classes.editButton}/>
                    </div>
                    <div className={props.classes.infoRow}>
                      <Typography variant="body2" className={props.classes.infoRowLabel}>
                        <I18nRead id="label" propertyId="customer_email" capitalize={true} />
                      </Typography>
                      <Typography variant="body2" className={props.classes.infoRowInfo}>
                        <View
                          id="customer_email"
                          rendererArgs={
                            {
                              NullComponent: I18nRead,
                              nullComponentArgs: { id: "unspecified", capitalize: true },
                            }
                          }
                          useAppliedValue={props.useAppliedValue}
                        />
                      </Typography>
                      <EditButton url={props.useEditUrl} field="customer_email" className={props.classes.editButton}/>
                    </div>
                    <div className={props.classes.infoRow}>
                      <Typography variant="body2" className={props.classes.infoRowLabel}>
                        <I18nRead id="label" propertyId="customer_phone" capitalize={true} />
                      </Typography>
                      <Typography variant="body2" className={props.classes.infoRowInfo}>
                        <View
                          id="customer_phone"
                          rendererArgs={
                            {
                              NullComponent: I18nRead,
                              nullComponentArgs: { id: "unspecified", capitalize: true },
                            }
                          }
                          useAppliedValue={props.useAppliedValue}
                        />
                      </Typography>
                      <EditButton url={props.useEditUrl} field="customer_phone" className={props.classes.editButton}/>
                    </div>
                  </>
                );
              }

              return null;
            }}
          </Reader>
        </div>
        <div className={props.classes.infoColumn}>
          <Typography variant="body2" className={props.classes.infoColumnTitle}>
            <I18nRead id="shipment_details" capitalize={true}/>
          </Typography>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="activation_date" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="activation_date"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="activation_date" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="shipment_date" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="shipment_date"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="shipment_date" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="brand" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="brand"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="brand" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="model" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="model"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="model" className={props.classes.editButton}/>
          </div>
          <Typography variant="body2" className={props.classes.infoColumnTitle}>
            <I18nRead id="sensor_details" capitalize={true}/>
          </Typography>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="serial_number" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="serial_number"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="serial_number" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="dev_eui" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="dev_eui"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="app_eui" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="app_eui"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="app_eui" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="app_key" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="app_key"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="app_key" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="abp_otaa" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="abp_otaa"
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="abp_otaa" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="nwk_skey" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="nwk_skey"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="app_skey" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="app_skey"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="app_skey" className={props.classes.editButton}/>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="dev_addrr" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="dev_addrr"
                rendererArgs={
                  {
                    NullComponent: I18nRead,
                    nullComponentArgs: { id: "unspecified", capitalize: true },
                  }
                }
                useAppliedValue={props.useAppliedValue}
              />
            </Typography>
            <EditButton url={props.useEditUrl} field="dev_addrr" className={props.classes.editButton}/>
          </div>
        </div>
      </div>

      <Reader id="customer">
        {(value: boolean) => {
          if (value) {
            return (
              <div className={props.classes.infoMap}>
                <Typography variant="body2" className={props.classes.infoRowLabel}>
                  <I18nRead id="label" propertyId="customer_address" capitalize={true} />
                  <EditButton url={props.useEditUrl} field="customer_address" className={props.classes.editButton2}/>
                </Typography>
                <View
                  id="customer_address"
                  rendererArgs={
                    {
                      NullComponent: I18nRead,
                      nullComponentArgs: { id: "unspecified", capitalize: true },
                      nullComponentInMap: true,
                    }
                  }
                  useAppliedValue={props.useAppliedValue}
                />
              </div>
            );
          }

          return null;
        }}
      </Reader>

      <div className={props.classes.richText}>
        <Typography variant="body2" className={props.classes.infoRowLabel}>
          <I18nRead id="label" propertyId="info" capitalize={true} />
          <EditButton url={props.useEditUrl} field="info" className={props.classes.editButton2}/>
        </Typography>
        <View
          id="info"
          rendererArgs={
            {
              NullComponent: I18nRead,
              nullComponentArgs: { id: "unspecified", capitalize: true },
            }
          }
          useAppliedValue={props.useAppliedValue}
        />
      </div>
    </>
  );
});

const tinksiViewStyles = createStyles({
  editButtonsContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

interface ITinksiViewProps extends WithStyles<typeof tinksiViewStyles> {
  match: {
    params: {
      id: string;
    };
  };
}

interface ITinksiEditProps extends WithStyles<typeof tinksiViewStyles> {
  match: {
    params: {
      fieldId: string;
    };
  };
}

const TinksiEdit = withStyles(tinksiViewStyles)((props: ITinksiEditProps) => {
  return (
    <>
      <Entry id={props.match.params.fieldId}/>
      <div className={props.classes.editButtonsContainer}>
        <Button onClick={goBack}>
          <I18nRead id="cancel" capitalize={true}/>
        </Button>
        <SubmitButton
          buttonColor="primary"
          buttonVariant="contained"
          redirectGoBack={true}
          i18nId="edit"
          options={{
            differingOnly: true,
            properties: [
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
            ],
          }}
        />
      </div>
    </>
  );
});

export const TinksiView = withStyles(tinksiViewStyles)((props: ITinksiViewProps) => {
  const viewId = parseInt(props.match.params.id, 10) || null;

  return (
    <ScrollKeeper id="tinksi-view">
      <ItemDefinitionProvider
        forId={viewId}
        itemDefinition="tinksi"
        longTermCaching={true}
        properties={
          [
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
        <Route path="/tinksi/view/:step" exact={true}>
          <BasicView useEditUrl={"/tinksi/view/" + viewId + "/edit/"} useAppliedValue={true}/>
        </Route>
        <Route path="/tinksi/view/:step/edit/:fieldId" component={TinksiEdit}/>
        <SubmitActioner>
          {(actioner) => (
            <>
              <Snackbar
                severity="success"
                i18nDisplay="edit_success"
                open={actioner.submitted}
                onClose={actioner.dismissSubmitted}
              />
              <Snackbar
                severity="error"
                i18nDisplay={actioner.submitError}
                open={!!actioner.submitError}
                onClose={actioner.dismissError}
              />
            </>
          )}
        </SubmitActioner>
      </ItemDefinitionProvider>
    </ScrollKeeper>
  );
});
