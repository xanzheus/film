import '../css/_loader.css';
import $ from 'jquery';
const loader = $('.whirly-loader').hide();
const showLoader = () => {
  loader.show();
};
const hideLoader = () => {
  loader.hide();
};
export { showLoader, hideLoader };

/* 

-------/ Markup /-------
<div class="whirly-loader"></div>
-------/ Import /-------
import { showLoader, hideLoader } from './js/_loader';
-------/ start  /-------
showLoader()
-------/  stop  /-------
hideLoader()

*/
