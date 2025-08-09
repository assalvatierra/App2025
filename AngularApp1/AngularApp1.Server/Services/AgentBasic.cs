using AngularApp1.Server.Controllers;
using AngularApp1.Server.Data;
using AngularApp1.Server.Services.Plugins;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using System;
using System.Runtime.CompilerServices;


namespace AngularApp1.Server.Services
{
    public class AgentBasic : IAgentBasic
    {
        string modelId = "gpt-4.1";
        string endpoint = "";
        string apiKey = "";

        string MainInstruction =string.Empty;
        Kernel kernel;
        Agent agent;

        private readonly ErpDbContext _context;

        public AgentBasic()
        {
            this.initializeKernel();
        }

        public AgentBasic(Agent agent, ErpDbContext context)
        {
            _context = context;
            this.agent = agent;
            this.initializeKernel();
        }

        private void initializeKernel()
        {
            kernel = Kernel.CreateBuilder()
                .AddAzureOpenAIChatCompletion(modelId, endpoint, apiKey)
                .Build();

            //default plugins
            EnvInfoPlugin envInfo = new EnvInfoPlugin();
            kernel.Plugins.AddFromObject(envInfo);


            if (this.agent.AgentFeatures != null && this.agent.AgentFeatures.Count > 0)
            {
                foreach (var feature in this.agent.AgentFeatures)
                {
                    if (feature.Code == "BIN")
                    {
                        AgentBinPlugin p = new AgentBinPlugin(_context, this.agent.Id);
                        kernel.Plugins.AddFromObject(p);
                    }

                    if(feature.Code == "EJOBS")
                    {
                        eJobPlugin p = new eJobPlugin();
                        kernel.Plugins.AddFromObject(p);
                    }

                    if (feature.Code == "MGR100")
                    {
                        AgentManagerPlugin p = new AgentManagerPlugin(_context, this.agent.Id);
                        kernel.Plugins.AddFromObject(p);
                    }

                }
            }


            var history = new ChatHistory();
        }


        public async Task<ActionResult<string>> processInstructions(string userInput, string chatHistory)
        {
            string agentFeedback = string.Empty;

            var chatCompletionService = kernel.GetRequiredService<IChatCompletionService>();
            
            // Enable planning
            OpenAIPromptExecutionSettings openAIPromptExecutionSettings = new()
            {
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
            };

            var history = new ChatHistory();
            history.AddUserMessage(getInstructions());
            history.AddUserMessage(chatHistory);
            history.AddUserMessage(userInput);

            // Get the response from the AI
            var result = await chatCompletionService.GetChatMessageContentAsync(
                history,
                executionSettings: openAIPromptExecutionSettings,
                kernel: kernel);




            return result.Content;
        }


        private string getInstructions()
        {
            string strInstructions = string.Empty;
            #region // Add system message to the history
            /*
            strInstructions = @"Instruction#
Reply to car rental rate inquiries. 
# Requirements  
- Use customer-friendly language; maintain professionalism, clarity.
- brief answer only. no need to show all the details such as calculations and basis of the rate. 
- don't include an explanation unless asked to do so.   
- Ensure currency format is in PHP (₱).  
- Calculations vary depending on the type of vehicle, destinations,number of days and inclusions

-ask these parameters and conditions to be able to calculate the rate
The  type of Vehicle
Number of days
Destinations
Fuel cost - either renter will shoulder or include in the rate
Additional parameters for rental destinations outside Davao
Driver’s meals - either renter will shoulder the cost or include the cost in the total rate
Driver's Accommodation - either renter will shoulder the cost or include the cost in the total rate
Other conditions 
Barge fees, if applicable,  if shouldered by renter or include the cost in the rate 

- When use ask for hint, by typing HINT, give a guide how what you can do and give sample request to for car rental inquiry: 
Example: How much is 2 days SUV rental to Gensan. Renter will should fuel cost, driver's meals and accommodation.


### Calculation instructions 

## Airport - Hotel Transfers within Downtown areas of the city
-P2,000 for all Van
-P1,500 for SUV, MPV and sedan
#Conditions: 
-Driver’s fee and fuel charges included. 
- Pickup from one location and drop off to one location
- 3 hrs use including waiting time. P350 per hour for overtime.
- Additional 300 per unit for hours between 10pm until 4am
- for areas beyond Talomo and Bunawan, 4 hours rate applies. 
- for out of town transfers or drop-off / pickup, one day out of town rate applies 


##Daily rate within Downtown areas of the city
-P3,500 for all types of vehicle 
#Conditions: 
-Driver’s fee, and fuel charges included. 
-Overtime charges is P350 per hour, starts after first 10 hours of travel.


##Daily rate for countryside areas of the city, such as Toril and Calinan
-P4,500 for all Vans
-P4,000 for SUVs or MPVs
#Conditions
- Driver’s fee, and fuel charges included. 
-Overtime charges is P350 per hour, starts after first 10 hours of travel.


##Daily rate for Panabo and Samal areas
-P4,500 for all Vans
-P4,000 for SUVs or MPVs
#Conditions
- Driver’s fee, and fuel charges included.
-P1,000 for the barge fee depending if the client opt to include in the rate 
-10 hrs use, overtime charges applies after 



##Daily rate for Davao City,  Panabo and Samal areas, Renter shoulders fuel cost
-P3,500 for all units  
#Conditions
- Driver’s fee included 
-10 hrs use, overtime charges applies after 




## One day out of town rental 
#Base Rate including driver’s fee
-P4,500 for Vans and SUVs
-P3,500 for MPVs and sedan
#Additional Charges (Don’t show in the reply unless ask)
-fuel cost (Don't show in the reply)
If the renter opts to include fuel cost to the rate, no additional within 60km range, Add P1,000 to rate for the first 90km distance from Davao, then additional P100 in every extra 10km.
no additional if renter will shoulder fuel cost

-Overtime charges is P350 per hour, starts after first 10 hours of travel.
-other fees, barge fees, ferry ison renters account




## multiple days, more than one day consecutive out of town rental 
#Base Rate including driver's fee
-P4,000 for Vans and SUVs
-P3,500 for MPVs and sedan
#Additional Charges (Don’t show in the reply unless ask)
-fuel cost (Don't show in the reply)
If the renter opts to include fuel cost to the rate, no additional within 60km range, Add P1,000 to rate for the first 90km distance from Davao, then additional P100 in every extra 10km.
no additional if renter will shoulder fuel cost
-Overtime charges is P350 per hour, starts after first 10 hours of travel.
-Driver’s meals: Add 500 per day to rate if renter opt to include in the rate
-Driver's accommodation: Add 500 per night if renter opt to include in the rate





# Output Format  
The response must be organized as follows:  

### summary of car rental service 
**type of vehicle  
**Duration**: [X Days]  
**Destinations**: [x destinations]
**Price**: ₱[Price in PHP] 
  
#### Conditions:  
- fuel charges
- driver’s meals
- driver’s accommodation
- parking fees, barge fees
";
            */
            #endregion

            string section = string.Empty;
            foreach (var instruction in agent.AgentInstructions)
            {
                if (section != instruction.Title)
                {
                    if (!string.IsNullOrEmpty(section))
                    {
                        strInstructions += "\n";
                    }
                    section = instruction.Title;
                    strInstructions += $"### {section}\n";

                }

                strInstructions += instruction.Content + "\n\n";
            }

            //strInstructions = "get and show reminders";
            return strInstructions;
        }

    }
}
