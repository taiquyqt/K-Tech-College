export const getTasks = async () => {
    const res = await fetch('https://server.aptech.io/workspaces/tasks', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  };
  
  export const getTasksByAssignee = async (assigneeId: number) => {
    const res = await fetch(`https://server.aptech.io/workspaces/tasks/assignee/${assigneeId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch tasks by assignee');
    return res.json();
  };