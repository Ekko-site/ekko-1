import get from "@/controllers/users/get";
import signUp from "@/controllers/users/sign-up";
import login from "@/controllers/users/login";
import remove from "@/controllers/users/remove";
import stripe from "@/controllers/users/stripe";
import facebook from "@/controllers/users/facebook";
import update from "@/controllers/users/update";
import cancel from "@/controllers/users/cancel";

export default {
  signUp,
  login,
  stripe,
  facebook,
  update,
  cancel,
  get
};
