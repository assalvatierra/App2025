using Microsoft.CodeAnalysis.CSharp.Syntax;
using RabbitMQ.Client;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.Extensions.Options;

namespace AngularApp1.Server.Services.RabbitMQ
{
    public class RabbitMqOptions
    {
        public string? Version { get; set; }
        public string? Url { get; set; }
        public string? Hostname { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    public class RabbitMqMessageDto
    {
        [Required]
        public string Message { get; set; }
    }

    public static class RabbitMq
    {

        public static void AddRabbitMqService(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<RabbitMqOptions>(
                builder.Configuration.GetSection("RabbitMq"));

            var options = builder.Configuration.GetSection("RabbitMq").Get<RabbitMqOptions>();

            if (options == null || string.IsNullOrEmpty(options.Version))
            {
                builder.Services.AddSingleton<IRabbitMqBasic, NoOpRabbitMq>();
            }
            else if (options.Version.ToUpper() == "CLOUDAMQP")
            {
                builder.Services.AddSingleton<IRabbitMqBasic, Cloudamqp>();
            }
            // Add more conditions for other versions if needed
        }



    }

    public interface IRabbitMqBasic
    {
        int Send(RabbitMqMessageDto dto);
    }

    public class NoOpRabbitMq: IRabbitMqBasic
    {
        public int Send(RabbitMqMessageDto dto) => 0;
    }

    public class Cloudamqp: IRabbitMqBasic
    {
        private readonly IConnection _connection;

        public Cloudamqp(IOptions<RabbitMqOptions> optionsAccessor)
        {
            var options = optionsAccessor.Value;
            var factory = new ConnectionFactory
            {
                Uri = new Uri(options.Url)
            };

            //local RabbitMQ server
            //var factory = new ConnectionFactory() { HostName = _hostname, Port = 5672, UserName = _username, Password = _password };
            
            _connection = factory.CreateConnection();
        }

        public int Send(RabbitMqMessageDto dto)
        {

            var message = string.IsNullOrEmpty(dto.Message) ? "Hello RabbitMQ!" : dto.Message;
            using (var channel = _connection.CreateModel())
            {
                channel.QueueDeclare(queue: "testQueue2",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var body = Encoding.UTF8.GetBytes(message);

                channel.BasicPublish(exchange: "",
                                     routingKey: "testQueue-2",
                                     basicProperties: null,
                                     body: body);
            }

            return 1;
        }

    }
}
