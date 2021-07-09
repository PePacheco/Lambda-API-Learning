const cdk = require('@aws-cdk/core');
const apigateway = require('@aws-cdk/aws-apigateway');
const lambda = require('@aws-cdk/aws-lambda')
const path = require('path')

class LambdaApiLearningStack extends cdk.Stack {
    /**
     *
     * @param {cdk.Construct} scope
     * @param {string} id
     * @param {cdk.StackProps=} props
     */
    constructor(scope, id, props) {
        super(scope, id, props);

        const api = new apigateway.RestApi(this, 'on-line-api', {
            restApiName: 'on-line-api',
            deployOptions: { stageName: 'DEVELOPMENT' },
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS
            }
        });

        const getApiVersion = new lambda.Function(this, 'getApiVersion', {
            code: new lambda.AssetCode(path.join('lib', 'lambdas')),
            handler: 'lambda.lambdaFunction',
            runtime: lambda.Runtime.NODEJS_12_X
        });

        const lambdaIntegrationExample = new apigateway.LambdaIntegration(getApiVersion);
        const url =  api.root.addResource('pedro')
        url.addMethod('GET', lambdaIntegrationExample)
        
    }
}

module.exports = { LambdaApiLearningStack }
