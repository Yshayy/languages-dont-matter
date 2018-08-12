using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Insights.Models;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Insights.Controllers
{
    [Route("api/insights")]
    [ApiController]
    public class InsightsController
    {
        private readonly ISendGridClient _sendgridClient;

        public InsightsController(ISendGridClient sendgridClient){
            _sendgridClient= sendgridClient;
        }
        [HttpPost]
        public async Task Post([FromBody] DeviceSnapshot deviceSnapshot)
        {
            Console.WriteLine("Got Device snapshot message");
            if (deviceSnapshot.BatteryLevel < 60){
                Console.WriteLine("Battery is lower than recommended threshold");
                var response = await _sendgridClient.SendEmailAsync(MailHelper.CreateSingleEmail(
                    from: new EmailAddress("test@example.com"),
                    to: new EmailAddress(deviceSnapshot.OwnerEmail),
                    subject: "Your battery is running low",
                    plainTextContent: $"Your battery is only at {deviceSnapshot.BatteryLevel}",
                    htmlContent: $"<strong>Your battery is only at {deviceSnapshot.BatteryLevel}</strong>"
                ));
                Console.WriteLine("Email was sent successfully");
            }
        }

    }
}
