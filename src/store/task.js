// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    toDoTasks: null,
    doingTasks: null,
    doneTasks: null,
  }),
  actions: {
    async fetchToDoTasks(projectId) {
      const { data: Tasks } = await supabase
        .from("Tasks")
        .select("*")
        .eq("project_id", projectId)
        .eq("status", 1)
        .order("id", { ascending: false });
      this.toDoTasks = Tasks;
    },
    async fetchDoingTasks(projectId) {
      const { data: Tasks } = await supabase
        .from("Tasks")
        .select("*")
        .eq("project_id", projectId)
        .eq("status", 2)
        .order("id", { ascending: false });
      this.doingTasks = Tasks;
    },
    async fetchDoneTasks(projectId) {
      const { data: Tasks } = await supabase
        .from("Tasks")
        .select("*")
        .eq("project_id", projectId)
        .eq("status", 3)
        .order("id", { ascending: false });
      this.doneTasks = Tasks;
    },
    async addTask(newTask, projectId) {
      const { Tasks, error } = await supabase
        .from("Tasks")
        .insert([{ name: newTask, project_id: projectId, status: 1 }]);
      if (error) throw error;
      if (Tasks) this.Tasks = Tasks;
    },
    async editTask(editName, TaskId) {
      const { data, error } = await supabase
        .from("Tasks")
        .update({ name: editName })
        .eq("id", TaskId);
      if (error) throw error;
    },
    async deleteTask(TaskId) {
      const { data, error } = await supabase
        .from("Tasks")
        .delete()
        .eq("id", TaskId);
    },

    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
