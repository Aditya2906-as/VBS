const API_URL = "http://localhost:8081";

const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

fetch(`${API_URL}/transactions/user/${userId}`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById("txnBody");
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No transactions found</td></tr>`;
            return;
        }

        data.forEach(txn => {
            tbody.innerHTML += `
                <tr>
                    <td>${txn.id}</td>
                    <td class="${txn.amount >= 0 ? 'credit' : 'debit'}">
                        ₹${txn.amount}
                    </td>
                    <td>₹${txn.currBalance}</td>
                    <td>${txn.description}</td>
                </tr>
            `;
        });
    })
    .catch(err => console.error(err));
