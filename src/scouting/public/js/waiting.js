let hints = ["If you misclick a button, you can always press UNDO to undo your mistake!", "Show up to scout on time! Try to be there a few minutes in advance.", "Stay focused when scouting. Data you collect helps us greatly.", "If you ever have an issue, make sure to notify the scouting admins.", "Before you leave, let the scouting team know so they can replace you.", "Remember, accuracy is key, as it allows us to pick the best teams for our alliance."]

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function toggleHintElement(hintElement) {
    //resize hint container to be the element's height if it is active
    setTimeout(() => {
        document.querySelector("#waiting .hint").style.height = Math.max(activeHint.offsetHeight, document.querySelector("#waiting .hint").offsetHeight) + "px";
        document.querySelector("#waiting").style.paddingBottom = Math.max(activeHint.offsetHeight, document.querySelector("#waiting .hint").offsetHeight) + 45 + "px";
    }, 250)

    //toggle the hint element's visibility
    if (hintElement.classList.contains("visible")) {
        hintElement.classList.remove("visible")
    } else {
        hintElement.classList.add("visible")
    }
}

//shuffle hints + create interval
shuffleArray(hints);
let [activeHint, inactiveHint] = document.querySelectorAll("#waiting .hint-text");
activeHint.innerText = hints[0];
toggleHintElement(activeHint);

//resize the hint container's height on page height change
document.querySelector("#waiting .cancel").addEventListener("click", async () => {
    location.href = '/';
})
document.querySelector("#waiting .info").addEventListener("click", async () => {
    setPage("waiting")
    switchPage("instructions")
})
window.addEventListener("resize", () => {
    document.querySelector("#waiting .hint").style.height = activeHint.offsetHeight + "px";
    console.log()
    document.querySelector("#waiting").style.paddingBottom = activeHint.offsetHeight + 45 + "px";
})

window.addEventListener("orientationchange", function () {
    document.querySelector("#waiting .hint").style.height = activeHint.offsetHeight + "px";
    console.log()
    document.querySelector("#waiting").style.paddingBottom = activeHint.offsetHeight + 45 + "px";
}, false);

//cycle through the hints
let hintNum = 1;
setInterval(() => {
    toggleHintElement(activeHint);
    toggleHintElement(inactiveHint);
    [activeHint, inactiveHint] = [inactiveHint, activeHint];
    activeHint.innerText = hints[hintNum++ % hints.length]
}, 6969)