'use strict';
const ApiBinding = require('discovery-proxy').ApiBinding;
const assert = require('assert');

// Replica Api Binding Test Cases
describe('replica-api-binding', () => {
  let Server = require('core-server').Server;
  let server = null;

  /**
   * Before every test we need to do the following:
   * 1. Launch an instance of PaymentService - port number specified in test/config/default.json
   */
  before((done) => {
    server = new Server("ReplicaService", null, null, {});

    server.init().then(() => {
      server.loadHttpRoutes();
      server.listen().then(() => {
        console.log('Up and running..');
        done();
      }).catch((err) => {
        console.log(err);
        done();
      });
    }).catch((err) => {
      console.log(err);
      done();
    });

  });

  /**
   * This test makes sure all the api(s) for ReplicaService are available via
   * ApiBinding.  Note the stubbed minimal ServiceDescriptor for ApiBinding.
   * It is assumed the ReplicaService is serving up a valid swagger.json that
   * accurately described the operations / tags supported by the ReplicaService.
   */
  it('api created when binding occurs', (done) => {

    let service = {
      endpoint: 'http://localhost:13616',
      schemaRoute: '/swagger.json'
    };
    console.log("Creating Binding");
    let apiBinding = new ApiBinding(service);

    apiBinding.bind().then((service) => {
      console.log(`Checking Api...`);
      if(service.api === undefined) {
        done(new Error("Api is null"));
      } else if(service.api.replicas === undefined) {
        done(new Error("Replicas Api is null"));
      } else {
        done();
      }
    }).catch((err) => {
      assert(err === undefined, "Error didn't occur");
      done();
    });

  }).timeout(2000);

  after(() => {

  });

});
