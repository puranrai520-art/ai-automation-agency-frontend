window.addEventListener("DOMContentLoaded", async() => {
    await Clerk.load();

    const box = document.getElementById("auth-box");

    if (!Clerk.user) {
        Clerk.mountSignIn(box);
        return;
    }

    // ✅ User fully loaded here
    box.innerHTML = `
    <p>Logged in as: ${Clerk.user.primaryEmailAddress.emailAddress}</p>
    <button id="logoutBtn">Logout</button>
  `;

    document.getElementById("logoutBtn").onclick = () => {
        Clerk.signOut();
    };

    // ✅ YAHI par saveUser call karo
    saveUser();
});

async function saveUser() {
    await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: Clerk.user.id,
            email: Clerk.user.primaryEmailAddress.emailAddress,
        }),
    });
}