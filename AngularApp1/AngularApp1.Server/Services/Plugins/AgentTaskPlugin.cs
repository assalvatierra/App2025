using Microsoft.SemanticKernel;
using System.ComponentModel;
using Erp.Domain.Models;
using AngularApp1.Server.Data;
//using Microsoft.Extensions.DependencyInjection;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace AngularApp1.Server.Services.Plugins
{
    public class AgentTaskPlugin
    {
        private readonly ErpDbContext _context;
        private readonly int _agentId;

        public AgentTaskPlugin(ErpDbContext context, int agentid)
        {
            _context = context;
            _agentId = agentid;
        }

        [KernelFunction("get_agentTasks")]
        [Description("agents database feature. " +
            "Gets task list."
            )]
        public string GetAgentTasks()
        {
            string tasks = "Task List \n";
            List<AgentTask> agentTasks = _context.AgentTask
                .Include(d => d.AgentTaskStatus)
                .Where(d => d.AgentTaskStatus==null || d.AgentTaskStatus.Active == 1)
                .ToList<AgentTask>();

            foreach (var task in agentTasks)
            {
                if (task.Description != null && task.Description.Length > 0)
                {
                    //tasks += Newtonsoft.Json.JsonConvert.SerializeObject(task);
                    tasks += $"Id:{task.Id},Title:{task.Title},Description:{task.Description}, Status:{task.AgentTaskStatus?.Name},"
                        +$"MonitoredBy:{task.MonitoredBy}, PerformedBy:{task.PerformedBy},Occurence:{task.Occurence},"
                        +$"DueDate:{task.DueDate},ScheduleDate:{task.ScheduleDate},NextReminder:{task.NextReminder},OtherInfo:{task.OtherInfo}";
                }
            }

            return tasks;
        }

        [KernelFunction("add_agentTasks")]
        [Description("agents database feature. " +
            "Save tasks." +
            "Types of tasks accepted: (1) General office tasks (2) Vehicle registration renewal tasks. "
            )]
        public string AddNewTask(AgentTask task)
        {
            string Tasksaved = "Unable to save";
            if (task != null)
            {
                _context.AgentTask.Add(task);
                _context.SaveChanges();
                Tasksaved = "Task saved successfully";
            }
            return Tasksaved;
        }

        [KernelFunction("update_agentTasks")]
        [Description("Update tasks")]
        public string UpdateTask(int taskId, AgentTask updateTask)
        {
            string taskUpdated = "Unable to update";

            if (updateTask != null )
            {
                var task = _context.AgentTask.FirstOrDefault(t => t.Id == taskId);
                if (task != null) {
                    task.Title = updateTask.Title;
                    task.Description = updateTask.Description;
                    task.MonitoredBy = updateTask.MonitoredBy;
                    task.PerformedBy = updateTask.PerformedBy;
                    task.Occurence = updateTask.Occurence;
                    task.DueDate = updateTask.DueDate;
                    task.ScheduleDate = updateTask.ScheduleDate;
                    task.NextReminder = updateTask.NextReminder;
                    task.OtherInfo = updateTask.OtherInfo;
                    task.AgentTaskStatusId = updateTask.AgentTaskStatusId;
                    _context.SaveChanges();
                    taskUpdated = "Task updated successfully";
                }
            }
            return taskUpdated;
        }

        [KernelFunction("update_agentTaskstatus")]
        [Description("Update Status for tasks")]
        public string UpdateTaskStatus(int taskId, int statusId)
        {
            string taskUpdated = "Unable to update";
            if (statusId > 0)
            {
                var task = _context.AgentTask.FirstOrDefault(b => b.Id == taskId);
                if (task != null)
                {
                    task.AgentTaskStatusId = statusId;
                    _context.SaveChanges();
                    taskUpdated = "Task updated successfully";
                }
            }
            return taskUpdated;
        }

        [KernelFunction("get_agentTaskStatusList")]
        [Description("agents database feature. " +
            "Gets tasks status list. AgentTaskStatus.Id is used for tasks Status."
            )]
        public object GetAgentTaskStatuses()
        {
            var statuses = _context.AgentTaskStatus
                .Select(s => new
                {
                    Id = s.Id,
                    Name = s.Name,
                    Active = s.Active
                })
                .ToList();

            return statuses;
        }



    }
}
