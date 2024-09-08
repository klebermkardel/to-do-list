document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskPriority = document.getElementById('task-priority').value;
    const taskList = document.getElementById('tasks');

    if (taskInput.value.trim() !== '') {
        // Criando o elemento de tarefa
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="complete-task">
            ${taskInput.value} - <strong>${taskPriority}</strong>
            <button class="delete-task">Excluir</button>
        `;

        // Adiciona a tarefa à lista
        taskList.appendChild(li);

        // Limpa o campo de input
        taskInput.value = '';

        // Evento de deletar tarefa
        li.querySelector('.delete-task').addEventListener('click', function() {
            li.remove();
        });

        // Evento de marcar como concluída
        li.querySelector('.complete-task').addEventListener('change', function() {
            li.classList.toggle('completed');
        });
    }
});
