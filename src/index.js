class Sensor {
    constructor(id) {
        this.deviceId = id;
        this.powerStatus = 'off';
        this.status = '';
        this.reportingInterval = 10000;
    }

    turn(status) {
        if(status==='on'&&this.powerStatus==='on') {
            throw new Error ('이미 켜져 있는 기기는 또 켤 수 없다.')
        }
        this.powerStatus = status;
        setTimeout(() => {
            this.status = 'sensingDistance';
            setTimeout(() => {
                this.status = 'reportingData';
                setTimeout(() => {
                    this.status = 'idle';
                }, 1000);
            }, 500);
        }, this.reportingInterval);
        this.status = 'idle';
    }
}

class IotServer {
    constructor() {
        this.actionId = '';
        this.deviceId = '';
    }

    start(sensor) {
        this.sensors = sensor;
    }

    publish(server_data) {
        if(!this.sensors[0].status) {
            return;
        }
        this.deviceId = server_data.deviceId;
        this.actionId = server_data.actionId;
        this.sensors[0].reportingInterval = server_data.payload;
    }
}

module.exports = {
    Sensor,
    IotServer,
};
