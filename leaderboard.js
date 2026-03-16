const loadLeaderboard = () => {
    const savedData = localStorage.getItem('tictactoe_leaderboard');

    if (!savedData) {
        return [];
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        return [];
    }
};

const saveLeaderboard = (data) => {
    localStorage.setItem('tictactoe_leaderboard', JSON.stringify(data));
};

const applyTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem('tictactoe_theme', theme);
};

const renderLeaderboard = () => {
    const tbody = document.getElementById('leaderboard-body');
    const data = loadLeaderboard()
        .slice()
        .sort((a, b) => b.score - a.score || b.wins - a.wins || a.losses - b.losses || a.name.localeCompare(b.name));

    tbody.innerHTML = '';

    if (!data.length) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6">Nu există încă meciuri jucate.</td>';
        tbody.appendChild(row);
        return;
    }

    data.forEach((player, index) => {
        const row = document.createElement('tr');

        if (index === 0) row.classList.add('rank-1');
        if (index === 1) row.classList.add('rank-2');
        if (index === 2) row.classList.add('rank-3');

        row.innerHTML = `
            <td class="rank-cell">${index + 1}</td>
            <td class="player-name">${player.name}</td>
            <td class="wins">${player.wins}</td>
            <td class="losses">${player.losses}</td>
            <td class="draws">${player.draws}</td>
            <td class="score">${player.score}</td>
        `;

        tbody.appendChild(row);
    });
};

const clearLeaderboard = () => {
    if (!window.confirm('Ești sigur că vrei să ștergi leaderboard-ul?')) {
        return;
    }

    saveLeaderboard([]);
    renderLeaderboard();
};

document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('leaderboardThemeSelect');
    const clearButton = document.getElementById('clearLeaderboardBtn');
    const savedTheme = localStorage.getItem('tictactoe_theme') || 'theme-default';

    applyTheme(savedTheme);

    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', (event) => applyTheme(event.target.value));
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearLeaderboard);
    }

    renderLeaderboard();
});
