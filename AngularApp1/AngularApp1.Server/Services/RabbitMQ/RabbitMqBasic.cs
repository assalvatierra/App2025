using RabbitMQ.Client;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AngularApp1.Server.Services.RabbitMQ
{
    public class RabbitMqMessageDto
    {
        [Required]
        public string Message { get; set; }
    }


    public class RabbitMqBasic
    {
        private readonly IConnection _connection;
        string _hostname = "localhost";
        string _username = "guest";
        string _passwrod = "guest";

        public RabbitMqBasic()
        {
            var factory = new ConnectionFactory() { HostName = _hostname, Port = 5672, UserName = _username, Password = _passwrod };
            //var factory = new ConnectionFactory() { HostName = _url};
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
