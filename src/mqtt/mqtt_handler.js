const mqtt = require('mqtt');

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = process.env.MQTT_HOST;
        this.username = process.env.MQTT_USER; // mqtt credentials if these are needed to connect
        this.password = process.env.MQTT_PASS;
        this.isConnected = false;
    }

    connect() {
        console.log("Conectando a MQTT SERVER")

        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        if (process.env.MQTT_USER !== '' && process.env.MQTT_PASS !== '') {
            this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
        } else {
            this.mqttClient = mqtt.connect(this.host);
        }

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            //this.mqttClient.end();
            this.isConnected = false;
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
            this.isConnected = true;
        });

        // mqtt subscriptions
        this.mqttClient.subscribe(process.env.MQTT_TOPIC, { qos: 0 });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
            this.isConnected = false;
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish(process.env.MQTT_TOPIC, message);
    }

}

module.exports = MqttHandler;