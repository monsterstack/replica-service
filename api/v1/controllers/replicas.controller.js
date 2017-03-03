'use strict';

const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const HealthService = require('core-server').HealthService;


const getReplicas = (app) => {
    return (req, res) => {
        res.status(HttpStatus.OK).send([]);
    }
};

const updateReplicas = (app) => {
    return (req, res) => {
        res.status(HttpStatus.OK).send({});
    }
};

exports.getReplicas = getReplicas;
exports.updateReplicas = updateReplicas;