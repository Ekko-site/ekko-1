import queryString from "query-string";
import restoreScroll from "redux-first-router-restore-scroll";

export default {
  querySerializer: queryString,
  restoreScroll: restoreScroll()
};
