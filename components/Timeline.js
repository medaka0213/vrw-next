import { ItemListTable } from "@medaka0213/react-vrw";

const App = ({ countdown, datetime, mode = "t_minus", ...props }) => {
  countdown = countdown.format(datetime);
  return (
    <ItemListTable
      columns={[
        {
          field: "td_str",
          headerName: mode === "t_minus" ? "T -" : "T +",
          width: 90,
          align: "center",
        },
        {
          field: "jst",
          headerName: "JST",
          width: 60,
          align: "center",
        },
        {
          field: "desc_jp",
          headerName: " ",
        },
      ]}
      rows={countdown[mode] || []}
      {...props}
    />
  );
};

export default App;
