'use strict';

const controller = require('../controllers/replicas.controller.js');

module.exports = (app) => {
    /**
     * @swagger
     * /replicas:
     *  get:
     *    description: Get Service Replicas Deployed in Swarm
     *    tags:
     *      - replica
     *    produces:
     *      - application/json
     *    consumes:
     *      - application/json
     *    responses:
     *      200:
     *        description: Set of Replicas
     *        type: array
     *        items:
     *          $ref: '#/definitions/Replica'
     */
    app.get('/api/v1/replicas', controller.getReplicas(app));

    /**
     * @swagger
     * /replicas/{dockerServiceName}:
     *  put:
     *    description: Get Service Replicas Deployed in Swarm
     *    tags:
     *      - replica
     *    produces:
     *      - application/json
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: dockerServiceName
     *        description: Docker Service Name that needs scaling
     *        require: true
     *        in: path
     *      - name: increment
     *        description: Number of instances to remove/add ( based on sign of value. + add, - minus )
     *        in: query
     *        required: true
     *        type: number
     *    responses:
     *      200:
     *        description: Replica modified
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Replica'
     *      404:
     *        description: Replica Not Found
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Error'
     *      400:
     *        description: Bad Request
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Error'
     *      401:
     *        description: Forbidden
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Error'
     *      403:
     *        description: Unauthorized
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Error'
     */
    app.put('/api/v1/replicas/:dockerServiceName', controller.updateReplicas(app));
};