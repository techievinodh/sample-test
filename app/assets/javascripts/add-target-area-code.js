function changeURL(val) {
    if(document.messageOptions){val === "Send now" ? document.messageOptions.action = "warning-reminder" : val === "Schedule" ? document.messageOptions.action = "warning-scheduler" : document.messageOptions.action = "warning-message-draft";}
    if(document.telephoneCallForm){val === "Yes" ? document.telephoneCallForm.action = "telephone-spoken-warn" : document.telephoneCallForm.action = "warning-summary";}
}