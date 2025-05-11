
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Task = {
  id: string
  title: string
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const router = useRouter()

  // Fetch tasks
  const fetchTasks = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return router.push('/login')

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (!error && data) setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session || !newTask.trim()) return

    const { error } = await supabase.from('tasks').insert([
      {
        title: newTask,
        user_id: session.user.id,
      },
    ])
    if (!error) {
      setNewTask('')
      fetchTasks()
    }
  }

  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (!error) fetchTasks()
  }

  return (
    <main>
      <h1>Your Tasks</h1>

      <div>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button
          onClick={handleAddTask}
          className='taskBtn'
        >
          Add
        </button>
      </div>

        <div className="taskList">
            <ul>
                {tasks.map((task) => (
                <li key={task.id}>
                    <span>➡️ {task.title}</span>
                    <button
                    onClick={() => handleDeleteTask(task.id)}
                    className='taskBtn'
                    >
                    Delete
                    </button>
                </li>
                ))}
            </ul>
        </div>
    </main>
  )
}
