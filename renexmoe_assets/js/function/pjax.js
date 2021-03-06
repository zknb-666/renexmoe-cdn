
import Pjax from "../lib/pjax_lib.js";
import nprogress from "../../../_snowpack/pkg/nprogress/nprogress.js";
const whenpjax = () => {
  nprogress.inc();
};
const whensuccess = () => {
  nprogress.done();
};
export default () => {
  let pjax = new Pjax({
    elements: "a:not([target=_blank])",
    selectors: [
      ".main-drawer",
      ".mdui-container",
      "title",
      ".pjax",
      ".mdui-toolbar",
    ],
    cacheBust: false,
  });
  pjax._handleResponse = pjax.handleResponse;
  pjax.handleResponse = function (responseText, request, href, options) {
    if (request.status !== 200) {
      location.href = href;
    } else {
      pjax._handleResponse(responseText, request, href, options);
    }
  };
  document.addEventListener("pjax:send", whenpjax);
  document.addEventListener("pjax:success", whensuccess);
  return pjax;
};
