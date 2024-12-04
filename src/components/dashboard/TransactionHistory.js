import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { bindActionCreators } from "redux";
import * as accountActions from "../../redux/actions/accountActions";

function TransactionHistory({transactHistory,actions}) {
  useEffect(() => {
    actions.getTransactionHistory();  // Triggers the API call when the component mounts
  }, [actions])
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  // useEffect(() => {
  //   console.log("props", props);
  //   // props.actions.getTransactionHistory();
  // }, [props.transactHistory]);

  function dateFormatter(dateArray) {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const hour = dateArray[3];
    const minute = dateArray[4];
    const second = dateArray[5];

    return (
      year +
      " : " +
      month +
      " : " +
      day +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  }

  return (
    <React.Fragment>
      <Title>Transaction History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Id</TableCell>
            <TableCell>Account Id</TableCell>
            <TableCell>Transaction Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reason Code</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log("SETTIMGS",transactHistory)}
          {transactHistory
            .sort((a, b) => b.transaction_id - a.transaction_id)
            .map((history) => (
              <TableRow key={history.transaction_id}>
                <TableCell>{history.transaction_id}</TableCell>
                <TableCell>{history.account_id}</TableCell>
                <TableCell>{history.transaction_type}</TableCell>
                <TableCell>{history.amount}</TableCell>
                <TableCell>{history.source}</TableCell>
                <TableCell>{`${history.status}`}</TableCell>
                <TableCell>{history.reason_code}</TableCell>
                <TableCell>{dateFormatter(history.created_at)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button onClick={() => {
        setShowAllAccounts(!showAllAccounts)
      }}>
        {showAllAccounts ? "Show Less Accounts" : "Show All Accounts"}
      </Button>
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getTransactionHistory: bindActionCreators(
        accountActions.getTransactionHistory,
        dispatch
      )
    },
  };
}

function mapStateToProps(state) {
  return {
    transactHistory: state.transactionHistoryReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
