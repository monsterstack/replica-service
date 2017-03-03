'use strict';
const config = require('config');
const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const ReplicaService = require(appRoot+'/services/replicaService').ReplicaService;


const getReplicas = (app) => {
    return (req, res) => {

        let swarmHost = config.swarm.host;
        let swarmPort = config.swarm.port;

        if(process.env.SWARM_HOST_IP) {
            swarmHost = process.env.SWARM_HOST_IP;
        }

        if(process.env.SWARM_PORT) {
            swarmPort = process.env.SWARM_PORT;
        }

        let replicaService = new ReplicaService({
            swarm: {
                host: swarmHost,
                port: swarmPort || 2375
            }
        });

        replicaService.findReplicas().then((replicas) => {
            res.status(HttpStatus.OK).send(replicas);
        }).catch((err) => {
            new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err.message).writeResponse(res);
        })
        
    }
};

const updateReplicas = (app) => {
    return (req, res) => {
        res.status(HttpStatus.OK).send({});
    }
};

exports.getReplicas = getReplicas;
exports.updateReplicas = updateReplicas;