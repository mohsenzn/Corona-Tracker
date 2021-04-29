import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infoBox">
      <CardContent>
          {/* Title i.e CoronaVirus  cases */}
            <Typography color="textSecondary" className="infoBox__title">{title}</Typography>
          {/* 1200 number of cases */}
            <h2 className="infoBox__cases">{cases}</h2>
          {/* 1.2m total */}
          <Typography color="textSecondary" className="infoBox__total">
              {total} Total
          </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
