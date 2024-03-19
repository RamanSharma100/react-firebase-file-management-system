import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import NavDashboard from "./NavDashboard";
import Home from "./Home";
import FolderAdminComponent from "./FolderAdminComponent";
import FolderComponent from "./FolderComponent";
import FileComponent from "./FileComponent";

const Dashboard = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const { isLoggedIn } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn]);
  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <NavDashboard />
      <Switch>
        <Route exact path={path} component={Home} />
        <Route
          exact
          path={`${path}/folder/admin/:folderId`}
          component={FolderAdminComponent}
        />
        <Route
          exact
          path={`${path}/folder/:folderId`}
          component={FolderComponent}
        />
        <Route exact path={`${path}/file/:fileId`} component={FileComponent} />
      </Switch>
    </Container>
  );
};

export default Dashboard;
