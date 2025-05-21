using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.Domain.Models
{
    public class LoginCredentials
    {
        public required string username { get; set; }
        public required string password { get; set; }
    }
}
