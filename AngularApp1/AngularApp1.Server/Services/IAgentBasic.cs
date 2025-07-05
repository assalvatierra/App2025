using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Services
{
    public interface IAgentBasic
    {
        Task<ActionResult<string>> processInstructions(string instructions, string history);
    }
}
