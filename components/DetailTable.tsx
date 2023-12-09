import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

function List({ items = [], sx = {} }: { items: any[]; sx: any }) {
  return (
    <TableContainer
      sx={{
        ...sx,
      }}
    >
      <Table aria-label="simple table">
        <TableBody>
          {items.map((item: any) => (
            <TableRow hover key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell {...item}>
                <strong>{item.value}</strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List;
