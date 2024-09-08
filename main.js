// Função para alternar o tema
document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-theme', this.checked);
    
    // Atualiza o texto do botão dependendo do estado do interruptor
    const themeLabel = document.querySelector('.theme-switcher label');
    if (this.checked) {
        themeLabel.setAttribute('aria-label', 'Modo Claro');
    } else {
        themeLabel.setAttribute('aria-label', 'Modo Noturno');
    }
});

// Função para adicionar nova tarefa
document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskPriority = document.getElementById('task-priority').value;
    const taskList = document.getElementById('tasks');

    if (taskInput.value.trim() !== '') {
        // Criando o elemento de tarefa
        const li = document.createElement('li');
        li.classList.add(`${taskPriority}-priority`); // Adiciona a classe de prioridade
        li.innerHTML = `
            <input type="checkbox" class="complete-task">
            ${taskInput.value} - <strong>${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</strong>
            <button class="delete-task">Excluir</button>
        `;

        // Adiciona a tarefa à lista
        taskList.appendChild(li);

        // Limpa o campo de input
        taskInput.value = '';

        // Evento de deletar tarefa
        li.querySelector('.delete-task').addEventListener('click', function() {
            li.remove();
            updateProgress(); // Atualiza a barra de progresso ao excluir
        });

        // Evento de marcar como concluída
        li.querySelector('.complete-task').addEventListener('change', function() {
            li.classList.toggle('completed');
            updateProgress(); // Atualiza a barra de progresso ao marcar como concluída
        });

        // Atualiza a barra de progresso ao adicionar
        updateProgress();
    }
});

// Função para atualizar a barra de progresso
function updateProgress() {
    const tasks = document.querySelectorAll('#tasks li');
    const completedTasks = document.querySelectorAll('#tasks li.completed');
    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;

    const progress = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

    document.getElementById('progress-bar').value = progress;
    document.getElementById('progress-text').textContent = `${progress}% Concluído`;
}

// Função de busca de tarefas (Barra de Pesquisa)
document.getElementById('search-task').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const tasks = document.querySelectorAll('#tasks li');

    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = 'flex';  // Mostra a tarefa se corresponder à busca
        } else {
            task.style.display = 'none';  // Esconde a tarefa se não corresponder
        }
    });
});

// Função para filtrar tarefas por prioridade
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const priority = this.getAttribute('data-priority');
        const tasks = document.querySelectorAll('#tasks li');

        tasks.forEach(task => {
            if (priority === 'all') {
                task.style.display = 'flex';  // Mostra todas as tarefas
            } else {
                task.style.display = task.classList.contains(`${priority}-priority`) ? 'flex' : 'none';  // Mostra ou esconde com base na prioridade
            }
        });
    });
});
