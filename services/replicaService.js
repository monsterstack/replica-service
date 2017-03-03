'use strict';

const needle = require('needle');

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
            needle.get(`${baseUrl}/services`, {}, (err, response) => {
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
            });
        });

        return p;
    }

    findReplica(id) {
        let self = this;
        let p = new Promise((resolve, reject) => {
            let baseUrl = self._buildBaseUrl();
            needle.get(`${baseUrl}/services/${id}`, {}, (err, response) => {
                if(err) reject(err);
                else {
                    let service = response.body;
                    let replica = {};
                    replica.count = service.Spec.Mode.Replicated.Replicas;
                    replica.name = service.Spec.Name;
                    replica.id = service.ID;
                    resolve(replica);
                }
            });
        });

        return p;
    }

    _buildBaseUrl() {
        let self = this;
        return `http://${self.swarmHost}:${self.swarmPort}/v1.24`;
    }
}

module.exports.ReplicaService = ReplicaService;