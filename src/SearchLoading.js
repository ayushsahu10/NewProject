import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

export default function SearchLoading() {
  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      padding="15px"
      alignItems="center"
    >
      <Skeleton width={100} animation="wave" height={150} />
      <Box width={'60%'}  >
        <Skeleton variant="h1" animation="wave" width={"90%"} />
        <br></br>

        <Skeleton variant="h1"  animation="wave" width={"90%"} height={50} />
      </Box>
    </Box>
  );
}
