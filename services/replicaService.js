'use strict';

const needle = require('needle');
const _ = require('lodash');

class ReplicaService {
    constructor(options) {
        this.options = options;

        this.swarmHost = options.swarm.host;
        this.swarmPort = options.swarm.port;
    }


    findReplicas() {
        let self = this;
        let p = new Promise((resolve, reject) => {
            let baseUrl = self._buildBaseUrl();

            // Handler for Needle GET
            let handler = (err, response) => {
                if(err) reject(err);
                else {
                    let services = response.body;
                    let replicas = [];
                    services.forEach((service) => {
                        replicas.push({
                            id: service.ID,
                            name: service.Spec.Name,
                            count: service.Spec.Mode.Replicated.Replicas
                        });
                    });
                    resolve(replicas);
                }
            };

            needle.get(`${baseUrl}/services`, self._requestOptions(), handler);
        });

        return p;
    }

    findReplica(id) {
        let self = this;

        return self._fetchRawService(id).then((rawService) => {
                let service = rawService;
                let replica = {};
                replica.count = service.Spec.Mode.Replicated.Replicas;
                replica.name = service.Spec.Name;
                replica.id = service.ID;
                resolve(replica);
        });
    }

    scaleReplica(replica, increment) {
        let self = this;
        let p = new Promise((resolve, reject) => {
            let myReplica = _.clone(replica);
            myReplica.count += increment;
            resolve(myReplica);
        });

        return p;
    }

    _fetchRawService(serviceId) {
        let self = this;
        let p = new Promise((resolve, reject) => {
            let handler = (err, response) => {
                if(err) reject(err);
                else 
                    resolve(response.body);
            };

            needle.get(`${baseurl}/services/${serviceId}`, self._requestOptions(), handler);
        });

        return p;
    }

    _buildBaseUrl() {
        let self = this;
        return `http://${self.swarmHost}:${self.swarmPort}/v1.24`;
    }

    _requestOptions() {
        return {};
    }
}

module.exports.ReplicaService = ReplicaService;