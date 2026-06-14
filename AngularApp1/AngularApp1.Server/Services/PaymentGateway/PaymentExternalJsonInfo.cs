namespace AngularApp1.Server.Services.PaymentGateway
{
    public class PaymentExternalJsonInfo
    {
        public string Description { get; set; } = string.Empty;
        public string ExternalReference { get; set; } = string.Empty;
        public string PaymongoStatus { get; set; } = string.Empty;
        public string PaymentLink { get; set; } = string.Empty;
        public string ReceiptEmail { get; set; } = string.Empty;
        public string EmailMessage { get; set; } = string.Empty;
        public string PaymongoId { get; set; } = string.Empty;
    }
}
