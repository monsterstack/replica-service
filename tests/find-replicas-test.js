'use strict';
const ReplicaService = require('../services/replicaService').ReplicaService;
const assert = require('assert');

const config = require('config');

// Replica Service Test Cases
describe('replica-service-test', () => {

    it('Service List is not null', (done) => {
        let replicaService = new ReplicaService({
            swarm: {
                host: config.swarm.host,
                port: config.swarm.port
            }
        });

        replicaService.findReplicas().then((replicas) => {
            console.log(replicas);
            if(replicas)
                done();
            else
                done(new Error('Null Replicas on Response'));
        }).catch((err) => {
            done(err);
        });
    });

});