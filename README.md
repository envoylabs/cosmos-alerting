# Serverless Alerting Hook

For monitoring basic liveness, you might want to send out text alerts if some metric changes. This endpoint provides a simple way of sending out text messages to one or more people on pager duty.

## Usage

First install with:

    npm install serverless -g 
    npm install

### Dev

Run in dev with `serverless offline`:

```bash
npm run dev
```

The dev hook by default uses an `API_TOKEN` set to `00000000-0000-0000-0000-000000000000`.

Then curl to test:

    curl -X POST http://localhost:3000/dev/send -d '{"message": "Voting power 0", "apiToken": "00000000-0000-0000-0000-000000000000"}'

You should get the response:

```json
{"message":"Alert sent"}
```

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node-http-api.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: serverless-http-api
stage: dev
region: us-east-1
stack: serverless-http-api-dev
resources: 12
api keys:
  None
endpoints:
  ANY - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: serverless-http-api-dev-hello
layers:
  None
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP (pass similar args to the dev example above):

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Alert sent"
}
```
