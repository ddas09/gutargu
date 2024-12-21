import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

class SignalRService {
  private baseUrl: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  private connections: { [hubUrl: string]: HubConnection } = {};

  /**
   * Set up a connection to a SignalR hub with a dynamic event name and a callback.
   * 
   * @param hubPath - Path to the hub (e.g., 'chatHub', 'notificationHub')
   * @param userId - User ID for connecting to the hub
   * @param eventName - Event name to listen for (e.g., 'ReceiveMessage', 'ReceiveNotification')
   * @param messageReceivedCallback - Callback function that will handle the data for the event
   */
  public startConnection<T>(
    hubPath: string,               
    userId: string,               
    eventName: string,             
    messageReceivedCallback: (message: T) => void
  ) {
    const hubUrl = `${this.baseUrl}/${hubPath}?userId=${userId}`;

    // Check if the connection already exists
    if (this.connections[hubUrl]) {
      console.log(`Connection to ${hubUrl} already exists.`);
      return;
    }

    // Create a new connection to the specific hub
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    connection
      .start()
      .then(() => {
        console.log(`Connected to ${hubUrl}`);

        // Listen for the specified event and call the provided callback function
        connection.on(eventName, (message: T) => {
          messageReceivedCallback(message);
        });
      })
      .catch((err) => {
        console.error('SignalR Connection Error: ', err);
        console.log(`Error connecting to ${hubUrl}`);
      });

    // Save the connection instance for later use
    this.connections[hubUrl] = connection;
  }

  // Stop connection to a specific hub
  public stopConnection(hubPath: string, userId: string) {
    const hubUrl = `${this.baseUrl}/${hubPath}?userId=${userId}`;

    if (this.connections[hubUrl]) {
      this.connections[hubUrl].stop()
        .catch(err => console.log('Error stopping SignalR connection: ' + err));

      delete this.connections[hubUrl];  // Clean up the connection reference
    }
  }
}

export default new SignalRService();
