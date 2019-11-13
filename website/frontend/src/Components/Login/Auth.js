import axios from "axios";
import passwordHash from "password-hash";

export default function isAuthorise(email, password) {
  let isAuth = false;
  var hashPassword = passwordHash.generate(password);
  axios
    .get(
      "http://localhost:8080/login/" +
        encodeURI(email) +
        "/" +
        encodeURI(hashPassword)
    ) //rajouter un hashage
    .then(res => {
      isAuth = res;
    })
    .catch(function(error) {
      // handle error
      console.log("ERROR : ", error);
    })
    .finally(function() {
      // always executed
    });

  return isAuth;
}
