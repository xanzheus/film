const addClassToElement = (ref, className) => {
    ref.classList.add(className);
} 

const removeClassFromElement = (ref, className) => {
    ref.classList.remove(className);
} 

export { addClassToElement, removeClassFromElement };