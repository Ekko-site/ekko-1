import React from "react";

import Sidebar from "@/components/sidebar";
import PageAdmin from "@/components/page-admin";
import Footer from "@/components/footer";

const AppContainer = ({ children, user, marginUnderPageAdmin, logout }) => {
  return (
    <div>
      <Sidebar user={user} logout={logout} />
      <div className="dash-main">
        <PageAdmin user={user} marginUnderPageAdmin={marginUnderPageAdmin} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AppContainer;
