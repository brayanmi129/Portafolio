import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { nodes } from "./data.js";
import { THEME } from "./theme.js";
import { useTheme } from "@table-library/react-table-library/theme";

function TablePremier() {
  const data = { nodes };

  const theme = useTheme(THEME);

  return (
    <Table data={data ?? []} theme={theme} layout={{ fixedHeader: true }}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>N°</HeaderCell>
              <HeaderCell>Team</HeaderCell>
              <HeaderCell>Pj</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
              <HeaderCell>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.name}</Cell>
                <Cell>
                  {new Date(item.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Cell>
                <Cell>{item.type}</Cell>
                <Cell>{item.isComplete.toString()}</Cell>
                <Cell>{item.nodes ? item.nodes.length : ""}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
}

export default TablePremier;
