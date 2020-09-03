using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SignalR
{
    public class VoteHub : Hub
    {
        
        
        static List<Vote> values = new List<Vote>();
        public async Task SendVote(string groupName)
        {
            var vote = values.FirstOrDefault(x => x.Key == groupName);
            if (vote!=null)
            {
                vote.Value++;

            }
            else
            {
                Vote newVote = new Vote()
                {
                    Key = groupName,
                    Value = 1

                };
                values.Add(newVote);
            }
            await Clients.All.SendAsync("ReceiveVote",values);
        }
    }

    public class Vote
    {
        public string Key { get; set; }
        public int Value { get; set; }
    }
}
