import React from "react";
import { WithStyles, createStyles, withStyles, Typography } from "@onzag/itemize/node_modules/@material-ui/core";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import View from "@onzag/itemize/client/components/property/View";
import Reader from "@onzag/itemize/client/components/property/Reader";

const basicViewStyles = createStyles({
  infoRow: {
    width: "100%",
  },
  infoRowLabel: {
    fontWeight: 500,
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
});

export const BasicView = withStyles(basicViewStyles)((props: WithStyles<typeof basicViewStyles>) => {
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
              <View id="status" capitalize={true} />
            </Typography>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="date_sold" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="date_sold"
                rendererArgs={{ NullComponent: I18nRead, nullComponentArgs: { id: "unspecified", capitalize: true } }}
              />
            </Typography>
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
              />
            </Typography>
          </div>
          <Reader id="customer">
            {(value: boolean) => {
              if (value) {
                return (
                  <>
                    <div className={props.classes.infoRow}>
                      <Typography variant="body2" className={props.classes.infoRowLabel}>
                        <I18nRead id="label" propertyId="customer_name" capitalize={true} />
                      </Typography>
                      <Typography variant="body2" className={props.classes.infoRowInfo}>
                        <View
                          id="customer_name"
                          rendererArgs={
                            {
                              NullComponent: I18nRead,
                              nullComponentArgs: { id: "unspecified", capitalize: true },
                            }
                          }
                        />
                      </Typography>
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
                        />
                      </Typography>
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
                        />
                      </Typography>
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
                        />
                      </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
          </div>
          <div className={props.classes.infoRow}>
            <Typography variant="body2" className={props.classes.infoRowLabel}>
              <I18nRead id="label" propertyId="abp_otaa" capitalize={true} />
            </Typography>
            <Typography variant="body2" className={props.classes.infoRowInfo}>
              <View
                id="abp_otaa"
              />
            </Typography>
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
              />
            </Typography>
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
              />
            </Typography>
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
                />
              </div>
            );
          }

          return null;
        }}
      </Reader>

      <div className={props.classes.richText}>
        <Typography variant="body2" className={props.classes.infoRowLabel}>
          <I18nRead id="label" propertyId="additional_info" capitalize={true} />
        </Typography>
        <View
          id="additional_info"
          rendererArgs={
            {
              NullComponent: I18nRead,
              nullComponentArgs: { id: "unspecified", capitalize: true },
            }
          }
        />
      </div>
    </>
  );
});
