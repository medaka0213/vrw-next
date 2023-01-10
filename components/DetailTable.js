import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

function List({ items = [], sx = {} }) {
  return (
    <TableContainer
      sx={{
        ...sx,
      }}
    >
      <Table aria-label="simple table">
        <TableBody>
          {items.map((item) => (
            <TableRow hover key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell>
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
