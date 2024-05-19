document.addEventListener("DOMContentLoaded", function() {
    // This event listener waits for the entire HTML document to be parsed and loaded before executing the code inside the function. It ensures that the JavaScript code doesn't try to manipulate HTML elements that haven't been loaded yet.
    const addFriendButton = document.getElementById("addFriendButton");
    const calculateButton = document.getElementById("calculateButton");

    addFriendButton.addEventListener("click", addFriendInput);
    calculateButton.addEventListener("click", calculateExpenses);
});

function addFriendInput() {
    const friendInputs = document.getElementById("friendInputs");

    const friendInput = document.createElement("div");
    friendInput.classList.add("friendInput");

    friendInput.innerHTML = `
        <input type="text" placeholder="Friend's Name">
        <input type="number" placeholder="Contribution">
    `;

    friendInputs.appendChild(friendInput);
}

function calculateExpenses() {
    const friendInputs = document.querySelectorAll(".friendInput");

    let totalExpense = 0;
    const friends = [];

    friendInputs.forEach(input => {
        const name = input.querySelector("input[type=text]").value;
        const contribution = parseFloat(input.querySelector("input[type=number]").value);
        if (name.trim() !== "" && !isNaN(contribution)) {
            totalExpense += contribution;
            friends.push({ name, contribution });
        }
    });

    const share = totalExpense / friends.length;

    const result = document.getElementById("result");
    result.innerHTML = ""; // Clear previous result

    friends.forEach(friend => {
        const amountOwed = share - friend.contribution;
        if (amountOwed > 0) {
            result.innerHTML += `${friend.name} should pay ${amountOwed.toFixed(2)} units to other friends.<br>`;
        } else if (amountOwed < 0) {
            result.innerHTML += `Other friends should pay ${Math.abs(amountOwed).toFixed(2)} units to ${friend.name}.<br>`;
        }
    });
}
