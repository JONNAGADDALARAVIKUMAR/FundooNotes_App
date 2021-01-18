import NotificationServices from "./services/NotificationServices/NotificationServices";

module.exports = async (taskData) => {
    NotificationServices.checkRemaindersSendPushNotification('closed')
}
