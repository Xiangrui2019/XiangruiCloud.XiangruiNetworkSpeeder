using Microsoft.AspNetCore;
using System;
using Microsoft.AspNetCore.Hosting;

namespace XiangruiCloud.XiangruiNetworkSpeeder
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder()
                .UseStartup<Startup>();
    }
}
