console.log("azeazea");
Array.from(document.getElementsByClassName("af-class-faq-wrap")).forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('click');
    })
});