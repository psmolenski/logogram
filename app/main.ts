import * as angular from "angular";
import logogram from "./logogram.module";
import './main.less';

angular.element(document).ready(() => {
  angular.bootstrap(document, [logogram.name]);
});

