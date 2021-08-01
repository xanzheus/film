import refs from './refs';

const { searchInput } = refs;

const clearSearchInput = () => {
    searchInput.value = '';
}

export { clearSearchInput };