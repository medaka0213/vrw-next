import * as React from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";

import { useRouter } from "next/router";

const App = ({ item }) => {
  return (
    <List>
      <Grid container>
        {items.map((item, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            key={`mission-list-${i}`}
            sx={{
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <MeeutpListItem item={item} />
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

export default App;
