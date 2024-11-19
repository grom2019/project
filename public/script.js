// Обробка кнопки "Приєднатися" для відкриття вікна вибору командування
const joinBtn = document.getElementById('joinBtn');
const modalCommand = document.getElementById('modalCommand');
const closeCommand = document.getElementById('closeCommand');

// Відкриття вікна вибору командування при натисканні на кнопку
joinBtn.addEventListener('click', () => {
    modalCommand.style.display = 'block';
});




// Закриття вікна вибору командування
closeCommand.addEventListener('click', () => {
    modalCommand.style.display = 'none';
});

// Закриття вікна при натисканні поза модальним вікном
window.addEventListener('click', (e) => {
    if (e.target === modalCommand) {
        modalCommand.style.display = 'none';
    }
});

// Обробка вибору командування
const commandBtns = document.querySelectorAll('.command-btn');
commandBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const command = e.target.textContent;
        console.log(`Вибрано командування: ${command}`);

        // Після вибору командування відкривається вікно для вибору роду військ
        modalCommand.style.display = 'none';  // Закриваємо попереднє вікно
        showBranchSelection();
    });
});

// Функція для показу вікна вибору роду військ
function showBranchSelection() {
    const modalBranch = document.getElementById('modalBranch');
    modalBranch.style.display = 'block';

    const closeBranch = document.getElementById('closeBranch');
    closeBranch.addEventListener('click', () => {
        modalBranch.style.display = 'none';
    });
    
    // Закриття вікна при натисканні поза ним
    window.addEventListener('click', (e) => {
        if (e.target === modalBranch) {
            modalBranch.style.display = 'none';
        }
    });
}


// Обробка вибору роду військ
const branchBtns = document.querySelectorAll('.branch-btn');
branchBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const branch = e.target.textContent;
        console.log(`Вибрано рід військ: ${branch}`);
        // Можна додати додаткову логіку після вибору
    });
});
function togglePositions(brigadeId) {
    const positionsList = positionsData[brigadeId];
    const listElement = document.getElementById('positions-list');

    // Очищаємо таблицю
    listElement.innerHTML = '';

    // Додаємо посади до таблиці
    positionsList.forEach(position => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${position}</td><td><button class="apply-btn">Подати заявку</button></td>`;
        listElement.appendChild(row);
    });

    // Показуємо модальне вікно
    document.getElementById('positions-overlay').style.display = 'flex';
}

function closePositions() {
    // Закриваємо модальне вікно
    document.getElementById('positions-overlay').style.display = 'none';
}
const positionsData = {
    1: [
        "Командир роти",
        "Командир батальйону",
        "Сапер",
        "Медик",
        "Водій",
        "Снайпер",
        "Оператор безпілотника",
        "Механік",
        "Командир відділення",
        "Розвідник"
    ],
    2: [
        "Командир роти",
        "Командир батальйону",
        "Сапер",
        "Медик",
        "Водій",
        "Снайпер",
        "Оператор безпілотника",
        "Механік",
        "Командир відділення",
        "Розвідник"
    ],
    3: [
        "Командир роти",
        "Командир батальйону",
        "Сапер",
        "Медик",
        "Водій",
        "Снайпер",
        "Оператор безпілотника",
        "Механік",
        "Командир відділення",
        "Розвідник"
    ]
};

function togglePositions(brigadeId) {
    const positionsList = positionsData[brigadeId];
    const listElement = document.getElementById('positions-list');

    // Очищаємо таблицю
    listElement.innerHTML = '';

    // Додаємо посади до таблиці
    positionsList.forEach(position => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${position}</td>
            <td>
                <button class="apply-btn" data-position="${position}">
                    Подати заявку
                </button>
            </td>`;
        listElement.appendChild(row);
    });

    // Додаємо обробник події для кнопок
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            redirectToApplicationPage(this.getAttribute('data-position'));
        });
    });

    // Відображаємо модальне вікно
    document.getElementById('positions-modal').classList.remove('hidden');
}

function closePositions() {
    // Ховаємо модальне вікно
    document.getElementById('positions-modal').classList.add('hidden');
}

function redirectToApplicationPage(position) {
    // Перенаправляє на сторінку заявки із динамічним параметром
    const encodedPosition = encodeURIComponent(position);
    const applicationUrl = `/application?position=${encodedPosition}`;
    location.assign(applicationUrl);
}
