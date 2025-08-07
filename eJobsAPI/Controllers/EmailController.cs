using eJobsAPI.Data;
using eJobsAPI.Services;
using MailKit;
using Microsoft.AspNetCore.Mvc;

namespace eJobsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailServices MailService;
        //injecting the IMailService into the constructor
        public EmailController(IEmailServices MailService)
        {
            this.MailService = MailService;
        }

        [HttpPost]
        public async Task<bool> SendMail(MailData Mail_Data)
        {
            return await MailService.SendMail(Mail_Data);
        }


        [HttpPost("SendMailTest")]
        public async Task<bool> SendMailTest()
        {
            MailData Mail_Data = new MailData()
            {
                EmailSubject = "Test Email Service",
                EmailBody = "This is a test email sent from eJobsAPI using MailKit.",
                EmailToId = "jahdielsvillosa@gmail.com",
                EmailToName = "jahdielsvillosa@gmail.com"
            };


            return await MailService.SendMail(Mail_Data);
        }
    }
}
