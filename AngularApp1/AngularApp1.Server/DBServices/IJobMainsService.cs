using AngularApp1.Server.DTOs;
using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public interface IJobMainsService
    {
        Task<List<JobMain>> GetAllAsync();
        Task<List<JobMainListDto>> GetListAsync();
        Task<JobMain?> GetByIdAsync(int id);
        Task<JobMain?> GetByRecordGuidAsync(string recordGuid);
        Task UpdateAsync(JobMain jobMain);
        Task<JobMain> AddAsync(JobMain jobMain);
        Task DeleteAsync(JobMain jobMain);
        bool Exists(int id);
    }
}
