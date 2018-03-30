

export const insightsConfig = ['applicationInsightsServiceProvider', (applicationInsightsServiceProvider) => {
    //var options = { applicationName:'demoStatsApp' };
    var options = {};
    // <PUT YOUR APPLICATION INSIGHTS KEY HERE> 
    applicationInsightsServiceProvider.configure('<YOUR INSTRUMENTATION KEY HERE>', options );
}];
