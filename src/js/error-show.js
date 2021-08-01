import refs from './refs';
import { addClassToElement, removeClassFromElement } from './actions-functions';

const { errorWrapper } = refs;

const NON_DISPLAYED_CLASS = 'non-displayed';

const showErrorMessageOnBadRequest = () => {
    removeClassFromElement(errorWrapper, NON_DISPLAYED_CLASS);
};