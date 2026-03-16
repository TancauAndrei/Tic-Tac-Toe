document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('startGameForm');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');

    document.body.className = localStorage.getItem('tictactoe_theme') || 'theme-default';

    player1Input.value = localStorage.getItem('tictactoe_player1') || '';
    player2Input.value = localStorage.getItem('tictactoe_player2') || '';

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const player1Name = (player1Input.value || '').trim() || 'Jucător X';
        const player2Name = (player2Input.value || '').trim() || 'Jucător O';

        localStorage.setItem('tictactoe_player1', player1Name);
        localStorage.setItem('tictactoe_player2', player2Name);

        window.location.href = 'game.html';
    });
});
