import mqttHandler from './mqtt_handler'

var mqttClient = new mqttHandler();
mqttClient.connect();

export default mqttClient