using eJobsAPI.Data;

namespace eJobsAPI.Services
{
    public interface IEmailServices
    {
        public Task<bool> SendMail(MailData Mail_Data);
    }
}
