# aws-sam-basic-authorizer
AWS SAM template for api-gateway with custom authorizer implementing basic auth.

## Usage
1. Package and upload project
```bash
aws cloudformation package \
    --template template.yml \
    --s3-bucket <your bucket> \
    --output-template post-template.yaml
```
2. Use package output to deploy
```bash
aws cloudformation deploy \
   --template-file post-template.yaml \
   --stack-name basic-auth-example \
   --capabilities CAPABILITY_IAM
```
