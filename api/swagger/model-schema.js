'use strict'
/**
 * @swagger
 * tags:
 *  - name: error
 *    description: 'Everything you need to know about Error'
 *  - name: health
 *    description: 'Everything you need to know about Health'
 *  - name: replica
 *    description: 'Everything you need to know about Replica'
 * definitions:
 *   Error:
 *     type: object
 *     required:
 *        - errorMessage
 *     properties:
 *        errorMessage:
 *          type: string
 *   Health:
 *     type: object
 *     required:
 *        - cpuPercentUsage
 *        - loadAvg
 *     properties:
 *        cpuPercentUsage:
 *          type: number
 *        loadAvg:
 *          type: number
 *   Replica:
 *      type: object
 *      required:
 *          - serviceName
 *          - count
 *      properties:
 *          serviceName:
 *            type: string
 *          count:
 *            type: number 
 */
