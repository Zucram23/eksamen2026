// API Base URL
const API_URL = 'http://localhost:3000/api';

// Current user data
let currentUser = null;

// DOM Elements
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const dashboard = document.getElementById('dashboard');
const createPlanSection = document.getElementById('createPlanSection');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
        showDashboard();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Toggle between login and register
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Workout Plans
    document.getElementById('createPlanBtn').addEventListener('click', () => {
        createPlanSection.classList.remove('hidden');
    });

    document.getElementById('cancelPlan').addEventListener('click', () => {
        createPlanSection.classList.add('hidden');
        document.getElementById('createPlanForm').reset();
    });

    document.getElementById('createPlanForm').addEventListener('submit', handleCreatePlan);
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            showDashboard();
            alert('Login succesfuldt!');
        } else {
            alert('Login fejlede: ' + data.error);
        }
    } catch (error) {
        alert('Fejl ved login: ' + error.message);
    }
}

// Handle Register
async function handleRegister(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        profile: {
            age: parseInt(document.getElementById('regAge').value),
            weight: parseInt(document.getElementById('regWeight').value),
            height: parseInt(document.getElementById('regHeight').value),
            gender: document.getElementById('regGender').value,
            fitnessGoal: document.getElementById('regGoal').value
        }
    };

    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Konto oprettet! Du kan nu logge ind.');
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            document.getElementById('registerForm').reset();
        } else {
            alert('Registrering fejlede: ' + data.error);
        }
    } catch (error) {
        alert('Fejl ved registrering: ' + error.message);
    }
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('user');
    currentUser = null;
    dashboard.classList.add('hidden');
    loginSection.classList.remove('hidden');
    alert('Du er nu logget ud');
}

// Show Dashboard
function showDashboard() {
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboard.classList.remove('hidden');

    document.getElementById('userName').textContent = currentUser.name;
    loadWorkoutPlans();
}

// Load Workout Plans
async function loadWorkoutPlans() {
    try {
        const response = await fetch(`${API_URL}/workout-plans/user/${currentUser.id}`);
        const plans = await response.json();

        const workoutList = document.getElementById('workoutList');
        workoutList.innerHTML = '';

        if (plans.length === 0) {
            workoutList.innerHTML = '<p>Du har ingen træningsplaner endnu.</p>';
            return;
        }

        plans.forEach(plan => {
            const planDiv = document.createElement('div');
            planDiv.className = 'workout-item';
            planDiv.innerHTML = `
                <div>
                    <h3>${plan.name}</h3>
                    <p>${plan.description || 'Ingen beskrivelse'}</p>
                    <p><strong>Type:</strong> ${plan.workoutType}</p>
                </div>
                <div>
                    <button onclick="deletePlan('${plan._id}')">Slet</button>
                </div>
            `;
            workoutList.appendChild(planDiv);
        });
    } catch (error) {
        alert('Fejl ved indlæsning af planer: ' + error.message);
    }
}

// Handle Create Plan
async function handleCreatePlan(e) {
    e.preventDefault();

    const planData = {
        user: currentUser.id,
        name: document.getElementById('planName').value,
        description: document.getElementById('planDesc').value,
        workoutType: document.getElementById('planType').value,
        exercises: []
    };

    try {
        const response = await fetch(`${API_URL}/workout-plans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Træningsplan oprettet!');
            createPlanSection.classList.add('hidden');
            document.getElementById('createPlanForm').reset();
            loadWorkoutPlans();
        } else {
            alert('Fejl ved oprettelse: ' + data.error);
        }
    } catch (error) {
        alert('Fejl: ' + error.message);
    }
}

// Delete Plan
async function deletePlan(planId) {
    if (!confirm('Er du sikker på at du vil slette denne plan?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/workout-plans/${planId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Plan slettet!');
            loadWorkoutPlans();
        } else {
            alert('Fejl ved sletning');
        }
    } catch (error) {
        alert('Fejl: ' + error.message);
    }
}