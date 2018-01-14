import * as angular from "angular";
import logogram from "./logogram.module";

angular.element(document).ready(() => {
  angular.bootstrap(document, [logogram.name]);
});

