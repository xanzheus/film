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

-------/ awaiting anchor class /-------
class="whirly-loader"
-------/ Import /-------
import { showLoader, hideLoader } from './js/_loader';
-------/ start  /-------
showLoader()
-------/  stop  /-------
hideLoader()

*/
